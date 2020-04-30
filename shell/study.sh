#!/bin/bash
echo $0
echo $PWD
CURRENT_DIR=$(dirname $0)
BASENAME=$(basename $PWD)
HOSTNAME=$(hostname)
echo $CURRENT_DIR
echo $BASENAME
echo $HOSTNAME
