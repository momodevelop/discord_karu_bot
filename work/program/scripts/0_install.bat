@echo off
Pushd "%~dp0"

set MODULES=merge-img discord.js sprintf-js request request-promise-native app-module-path @types/sprintf-js @types/request-promise-native @types/node @types/core-js jimp

cd ..
echo Uninstalling modules...
rmdir /S /Q node_modules
del /Q package-lock.json
del /Q package.json
call npm init -y
call npm install %MODULES%
echo Installed!

popd