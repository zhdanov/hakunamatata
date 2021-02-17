#!/bin/bash

pushd "$(dirname "$0")"

    mkdir -p ../.babel-in

    cp ../hakunamatata.js ../.babel-in/

    for layer in $(node build__show-layer-list.js);
        do mkdir -p ../.babel-in/$(basename "$layer");
        cp -R ../$layer/* ../.babel-in/$(basename "$layer")/;
    done

popd
