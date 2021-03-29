#!/bin/bash

APP=$1
CONTAINER=$2

sudo -- sh -c "[ -f /root/.ssh/id_rsa ] && kubectl cp /root/.ssh/id_rsa -n $APP $APP-0:/root/.ssh/ -c $CONTAINER"
