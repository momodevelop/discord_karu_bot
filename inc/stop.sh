#!/bin/sh

uid=`forever list | grep discord-karu-bot.js | cut -c24-27`
forever stop $uid
