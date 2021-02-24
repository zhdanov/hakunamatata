#!/bin/bash

set -eux

pushd "$(dirname "$0")"

    for layer in $(node build__show-layer-list.js);
        do npx stylelint "../$layer";
    done

popd
