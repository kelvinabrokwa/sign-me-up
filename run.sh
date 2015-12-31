#!/usr/bin/env bash

set -e -o pipefail

# semester codes
# fall 2015 - 201610
# spring 2016 - 201620

USAGE='Usage: ./run.sh -s <SEMESTER_CODE> -c <CRN>'

while getopts ":s:c:" opt; do
    case ${opt} in
        s )
            semester=$OPTARG
            ;;
        c )
            crn=$OPTARG
            ;;
        \? )
            echo $USAGE
            ;;
        : )
            echo $USAGE;
            exit;
            ;;
    esac
done

if [ -z $semester ] || [ -z $crn ]
then
    echo $USAGE
else
    node scrape.js $semester | python parse.py | node register.js $crn >> log.txt
fi

