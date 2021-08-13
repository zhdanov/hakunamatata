#!/bin/bash

PROJECT=$1

if nc -z -w2 gitlab-prod.gitlab-prod 80 2>/dev/null
then

    if [[ ! -d /var/www/$PROJECT ]]; then
        mkdir -p /var/www/$PROJECT
    fi

    if [[ ! -d /var/www/$PROJECT/.git ]]; then

        pushd /var/www/$PROJECT/
            git init
            git remote add origin git@gitlab-prod.gitlab-prod:\$HOME_USER_NAME/$PROJECT.git
            git pull origin master
            git submodule update --init --recursive
            rm -rf hakunamatata/werf
            rm -rf hakunamatata/helm
            cp /root/Gemfile .
            bundle install
        popd
    fi

fi

echo '0.0.0.0  $PROJECT-dev.loc' >> /etc/hosts

if [[ -f /var/www/$PROJECT/Gemfile ]]; then

    pushd /var/www/$PROJECT/
        jekyll serve -w -I > /dev/null 2>&1 &
    popd

fi
