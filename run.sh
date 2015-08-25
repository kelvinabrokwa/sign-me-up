#!/usr/bin/env bash

node scrape.js 201610 | python parse.py | node register.js $1
