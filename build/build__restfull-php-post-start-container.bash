#!/bin/bash

PROJECT=$1

if nc -z -w2 gitlab-prod.gitlab-prod 80 2>/dev/null
then

    if [[ ! -d /var/www/$PROJECT-backend ]]; then
        mkdir -p /var/www/$PROJECT-backend
    fi

    if [[ ! -d /var/www/$PROJECT-backend/.git ]]; then

        pushd /var/www/$PROJECT-backend/
            git init
            git remote add origin git@gitlab-prod.gitlab-prod:$HOME_USER_NAME/$PROJECT.git
            git pull origin master
            git submodule update --init --recursive
            composer install
            chmod -R 777 storage
            php artisan swagger-lume:publish
            php artisan swagger-lume:generate
        popd
    fi

fi

echo "0.0.0.0  $PROJECT-dev.loc" >> /etc/hosts
