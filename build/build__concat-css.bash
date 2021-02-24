#!/bin/bash

TMP_DIR=.concat-css

function concat_css {
    LIST=$(node build/build__show-layer-list.js $1 /**/*.css)
    if [[ $LIST != '' ]]; then
        npx concat-cli -f $LIST -o $TMP_DIR/$1.css
    else
        touch $TMP_DIR/$1.css
    fi
}

pushd "$(dirname "$0")/.."

    mkdir -p $TMP_DIR

    concat_css common.blocks
    concat_css desktop.blocks
    concat_css mobile.blocks
    concat_css mobile-landscape.blocks
    concat_css mobile-portrait.blocks

popd
