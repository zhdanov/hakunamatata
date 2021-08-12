#!/bin/bash

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -j|--jekyll) jekyll="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ ! -z ${jekyll+x} ]; then
    if [ "$jekyll" == "" ]; then
        echo "set -j %project_name%"
        exit 1
    fi
fi

git submodule add https://github.com/zhdanov/hakunamatata

cat << EOF > werf.yaml
project: {{ env "appname" }}
configVersion: 1
deploy:
  namespace: {{ env "appname" }}-{{ env "environment" }}
  namespaceSlug: false
EOF

mkdir -p .werf
ln -s ../hakunamatata/werf .werf/common
rm -f hakunamatata/werf/werf

mkdir -p .helm
touch .helm/values.yaml
mkdir -p .helm/templates
ln -s ../../hakunamatata/helm .helm/templates/common
rm -f hakunamatata/helm/helm

cat << EOF > ./.helm/templates/common.yaml
{{- include "h-service" (list $ .) }}
{{- include "h-ingress" (list $ .) }}
EOF

cat << EOF > namespace-list.txt
development
EOF

# -j --jekyll
if [ ! -z ${jekyll+x} ]; then
    cat << EOF >> ./.helm/templates/common.yaml
{{- include "h-jekyll" (list $ .) }}
EOF

    mkdir -p build

    cat << EOF >> build/build__post-start-container.bash
#!/bin/bash

if nc -z -w2 gitlab-prod.gitlab-prod 80 2>/dev/null
then

    if [[ ! -d /var/www/$jekyll ]]; then
        mkdir -p /var/www/$jekyll
    fi

    if [[ ! -d /var/www/$jekyll/.git ]]; then

        pushd /var/www/$jekyll/
            git init
            git remote add origin git@gitlab-prod.gitlab-prod:\$HOME_USER_NAME/$jekyll.git
            git pull origin master
            git submodule update --init --recursive
            rm -rf hakunamatata/werf
            rm -rf hakunamatata/helm
            cp /root/Gemfile .
            bundle install
        popd
    fi

fi

echo '0.0.0.0  $jekyll-dev.loc' >> /etc/hosts

if [[ -f /var/www/$jekyll/Gemfile ]]; then

    pushd /var/www/$jekyll/
        jekyll serve -w -I > /dev/null 2>&1 &
    popd

fi
EOF

    chmod +x build/build__post-start-container.bash

    cat << EOF >> werf.yaml

---
{{ \$tpl := .Files.Get ".werf/common/jekyll.yaml" }}
{{ tpl \$tpl . }}

---
{{ \$tpl := .Files.Get ".werf/common/wait-http-200.yaml" }}
{{ tpl \$tpl . }}
EOF

    cat << EOF >> .gitignore
.jekyll-metadata
.jekyll-cache
_site
Gemfile
Gemfile.lock
EOF

    cat << EOF > .helm/postdeploy.bash
#!/bin/bash

pushd "\$(dirname "\$0")"

    ./../hakunamatata/container/container__make-alias.bash $jekyll-dev jekyll
    ./../hakunamatata/container/container__copy-dotfiles.bash $jekyll-dev jekyll
    ./../hakunamatata/container/container__copy-root-ssh-key.bash $jekyll-dev jekyll

popd
EOF

    chmod +x .helm/postdeploy.bash

    cat << EOF > build/build__hard.bash
#!/bin/bash
./hakunamatata/build/build__jekyll-static-hard.bash
EOF

    chmod +x build/build__hard.bash

fi
