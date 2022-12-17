#!/bin/bash

APP=$1
CONTAINER=$2

kubectl cp ~/.vimrc -n $APP $APP-0:/root/ -c $CONTAINER
kubectl cp ~/.vim -n $APP $APP-0:/root/ -c $CONTAINER
kubectl cp ~/.gitconfig -n $APP $APP-0:/root/ -c $CONTAINER

kubectl exec -it -n $APP $APP-0 -c $CONTAINER -- mkdir -p /root/.config
kubectl cp ~/.config/nvim -n $APP $APP-0:/root/.config/ -c $CONTAINER
