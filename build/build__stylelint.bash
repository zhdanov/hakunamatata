#!/bin/bash

set -eux

pushd "$(dirname "$0")/.."

    npx stylelint $(node build/build__show-layer-list.js)

popd
