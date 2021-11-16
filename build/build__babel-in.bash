#!/bin/bash

pushd "$(dirname "$0")"

    mkdir -p ../.babel-in

    cp ../hakunamatata.js ../.babel-in/

    for layer in $(node build__show-layer-list.js);
        do mkdir -p ../.babel-in/$(basename "$layer");
        cp -R ../$layer/* ../.babel-in/$(basename "$layer")/;
    done

    # remove tests for non-test env
    [ "$H_ENV_TEST" != "1" ] && find ./../.babel-in/ -type d -name 'tests' -prune -exec rm -rf {} \;

popd
