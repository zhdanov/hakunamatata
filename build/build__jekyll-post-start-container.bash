#!/bin/bash

PROJECT=$1

# fix write file error
PATH_TO_FILE_HELPER=/var/lib/gems/*/gems/jekyll-admin-*/lib/jekyll-admin/file_helper.rb
sed -i '25,25{s/^/#/}' $PATH_TO_FILE_HELPER
sed -i '32,32{s/^/#/}' $PATH_TO_FILE_HELPER

# fix to_api error
function fix_to_api_error() {
  local NUM=${1}
  local PATH_TO_FILE=${2}
  sed -i "${NUM},${NUM}{s/^/#/}" $PATH_TO_FILE
  sed -i "${NUM},${NUM}{s/^/\n \
          if new? || renamed?\n \
            sleep(1)\n \
            path = {\"path\": write_path.split(\"\/\").slice(4, write_path.length()).join(\"\/\")}\n \
            json path\n \
          else\n \
            json written_file.to_api(:include_content => true)\n \
          end\n \
  /}" $PATH_TO_FILE
}
fix_to_api_error 28 /var/lib/gems/*/gems/jekyll-admin-*/lib/jekyll-admin/server/pages.rb
fix_to_api_error 37 /var/lib/gems/*/gems/jekyll-admin-*/lib/jekyll-admin/server/collections.rb

# hide scroll in editor
sed -i 's/display:none}.CodeMirror-vscrollbar/display:none !important}.CodeMirror-vscrollbar}/g' /var/lib/gems/*/gems/jekyll-admin-*/lib/jekyll-admin/public/static/css/main*chunk.css

# .bashrc
echo "
# fzf + rg￼
export FZF_DEFAULT_COMMAND='rg --files --no-ignore -g \"!{.git,node_modules,vendor}/*\" 2> /dev/null'
export FZF_CTRL_T_COMMAND=\"\$FZF_DEFAULT_COMMAND\"
if [ -t 1 ]
then
  bind -x '\"\C-p\": fzf_path=\$(fzf); vim \$fzf_path; history -s vim \$fzf_path'
fi" >> /root/.bashrc

# first init
if nc -z -w2 gitlab-prod.gitlab-prod 80 2>/dev/null
then

    if [[ ! -d /var/www/$PROJECT ]]; then
        mkdir -p /var/www/$PROJECT
    fi

    if [[ ! -d /var/www/$PROJECT/.git ]]; then

        pushd /var/www/$PROJECT/
            git init
            git remote add origin git@gitlab-prod.gitlab-prod:$HOME_USER_NAME/$PROJECT.git
            git pull origin master
            git submodule update --init --recursive
            rm -rf hakunamatata/werf
            rm -rf hakunamatata/helm
            cp /root/Gemfile .
            bundle install
        popd
    fi
fi

# host
echo "0.0.0.0  $PROJECT-dev.loc" >> /etc/hosts

# fix broken ruby
if [[ -f /var/www/$PROJECT/Gemfile.lock ]]; then
    pushd /var/www/$PROJECT/
        rm Gemfile.lock
        bundle install
    popd
fi

# start jekyll
if [[ -f /var/www/$PROJECT/Gemfile ]]; then

    pushd /var/www/$PROJECT/
        jekyll serve -w -I > /dev/null 2>&1 &
    popd
fi
