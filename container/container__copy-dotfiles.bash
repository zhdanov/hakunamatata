#!/bin/bash

APP=$1
CONTAINER=$2

kubectl cp ~/.vimrc -n $APP $APP-0:/root/ -c $CONTAINER
kubectl cp ~/.gitconfig -n $APP $APP-0:/root/ -c $CONTAINER
