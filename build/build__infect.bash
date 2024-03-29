#!/bin/bash

PROJECT=`basename "$PWD"`
EXT=''

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -p|--promo) EXT=promo; shift ;;
        -r|--restfull-php) EXT=restfullphp; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [[ ! -d .git ]]; then
    git init
fi

git submodule add git@gitlab-prod.gitlab-prod:zhdanov/hakunamatata.git

cat << EOF > werf.yaml
project: {{ env "appname" }}
configVersion: 1
deploy:
  namespace: {{ env "appname" }}-{{ env "environment" }}
  namespaceSlug: false
EOF

cat << EOF > werf-giterminism.yaml
giterminismConfigVersion: 1
config:
  goTemplateRendering:
    allowEnvVariables:
      - environment
      - appname
      - HOME_USER_NAME
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
dev
EOF

# -p --promo begin
if [ "$EXT" == "promo" ]; then
    cat << EOF >> ./.helm/templates/common.yaml
{{- include "h-promo" (list $ .) }}
EOF

    mkdir -p build

    cat << EOF >> build/build__post-start-container.bash
#!/bin/bash
pushd "\$(dirname "\$0")"
    ./../hakunamatata/build/build__jekyll-post-start-container.bash $PROJECT
popd
EOF

    chmod +x build/build__post-start-container.bash

    cat << EOF >> werf.yaml

---
image: promo
from: werf-registry.kube-system.svc.cluster.local/hakunamatata:promo_latest
git:
- add: /
  to: /root/{{ env "appname" }}

---
image: h_wait_http_200
from: werf-registry.kube-system.svc.cluster.local/hakunamatata:wait_http_200_latest
EOF

    cat << EOF >> .gitignore
*.gem
.bundle
.ruby-version
.jekyll-metadata
.jekyll-cache
_site
Gemfile
Gemfile.lock
EOF

    cat << EOF > .helm/postdeploy.bash
#!/bin/bash
pushd "\$(dirname "\$0")"
    ./../hakunamatata/container/container__make-alias.bash $PROJECT-dev promo
    ./../hakunamatata/container/container__copy-dotfiles.bash $PROJECT-dev promo
    ./../hakunamatata/container/container__copy-root-ssh-key.bash $PROJECT-dev promo
popd
EOF

    chmod +x .helm/postdeploy.bash

    cat << EOF > build/build__hard.bash
#!/bin/bash
./hakunamatata/build/build__jekyll-static-hard.bash
EOF

    chmod +x build/build__hard.bash

    cat << EOF > build/build__commit.bash
#!/bin/bash
./hakunamatata/build/build__jekyll-git-commit-content.bash
EOF

    chmod +x build/build__commit.bash

fi
# -p --promo end

# -r --restfull-php begin
if [ "$EXT" == "restfullphp" ]; then
    cat << EOF >> ./.helm/templates/common.yaml
{{- include "h-restfull-php" (list $ .) }}
EOF

    cat << EOF >> ./.helm/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Chart.Name }}-config-files
data:

{{- include "h-config-nginx-backend" (list $ .) | indent 2 }}
EOF

    mkdir -p build

    cat << EOF >> build/build__post-start-container.bash
#!/bin/bash
pushd "\$(dirname "\$0")"
    ./../hakunamatata/build/build__restfull-php-post-start-container.bash $PROJECT
popd
EOF

    chmod +x build/build__post-start-container.bash

    cat << EOF >> werf.yaml

---
{{ \$tpl := .Files.Get ".werf/common/restfull-php.yaml" }}
{{ tpl \$tpl . }}

---
{{ \$tpl := .Files.Get ".werf/common/wait-http-200.yaml" }}
{{ tpl \$tpl . }}
EOF

    cat << EOF > .helm/postdeploy.bash
#!/bin/bash
pushd "\$(dirname "\$0")"
    ./../hakunamatata/container/container__make-alias.bash $PROJECT-dev php-fpm
    ./../hakunamatata/container/container__copy-dotfiles.bash $PROJECT-dev php-fpm
    ./../hakunamatata/container/container__copy-root-ssh-key.bash $PROJECT-dev php-fpm
popd
EOF

    chmod +x .helm/postdeploy.bash

    shopt -s dotglob nullglob
    rm -rf /tmp/hm-infect && mkdir /tmp/hm-infect && mv * /tmp/hm-infect/
    composer -vvv create-project --prefer-dist laravel/lumen .
    mv /tmp/hm-infect/* . && rmdir /tmp/hm-infect

    composer require "darkaonline/swagger-lume:8.*"

    composer require 'zircote/swagger-php:3.*'

    ./hakunamatata/text/text__replace-matched-line.php \
    '// $app->withFacades();' \
    '$app->withFacades();' \
    bootstrap/app.php

    ./hakunamatata/text/text__insert-line-after-match.php \
    "\$app->configure('app');" \
    "\$app->configure('swagger-lume');" \
    bootstrap/app.php

    ./hakunamatata/text/text__insert-line-after-match.php \
    "\$app->register(App\Providers\EventServiceProvider::class);" \
    "\$app->register(\SwaggerLume\ServiceProvider::class);" \
    bootstrap/app.php

    cat << EOF >> app/Http/Controllers/Controller.php
/** @OA\Info(title="API", version="0.1") */
/** @OA\Get(path="/",description="API",@OA\Response(response="default", description="Welcome page")) */
EOF

    chmod -R 777 storage

fi
# -j --restfull-php end

git add .
git commit -m 'build(hakunamatata): infect'
