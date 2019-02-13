#!/bin/sh

SCRIPT=`readlink -f "$0"`
SCRIPTPATH=$(dirname "$SCRIPT")

cd $SCRIPTPATH

forever start ./discord-karu-bot.js

