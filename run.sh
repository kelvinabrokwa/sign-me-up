#!/usr/bin/env bash

node $dir/scrape.js 201610 | python $dir/parse.py | node register.js $1
