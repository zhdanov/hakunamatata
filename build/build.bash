#!/bin/bash

pushd "$(dirname "$0")"

    node build__init-blocks.js
    node build__init-templates.js

popd
