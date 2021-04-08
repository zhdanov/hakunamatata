#!/bin/bash

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
rm hakunamatata/werf/werf

mkdir -p .helm
touch .helm/values.yaml
mkdir -p .helm/templates
ln -s ../../hakunamatata/helm .helm/templates/common
rm hakunamatata/helm/helm

cat << EOF > ./.helm/templates/common.yaml
{{- include "h-service" (list $ .) }}
{{- include "h-ingress" (list $ .) }}
EOF
