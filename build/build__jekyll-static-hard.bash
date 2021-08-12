#!/bin/bash

pkill -f 'jekyll serve'
jekyll build
jekyll serve -w -I > /dev/null 2>&1 &
