#!/bin/bash

APP=$1
CONTAINER=$2

if ! grep -q "# $APP" ~/.bashrc; then
    echo "# $APP" >> ~/.bashrc
    echo "alias $APP='kubectl -n $APP exec -it $APP-0 -c $CONTAINER -- /bin/bash'" >> ~/.bashrc
fi
