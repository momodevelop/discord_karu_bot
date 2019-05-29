@echo off
Pushd "%~dp0"


set MODULES=merge-img@2.1.3 discord.js@11.4.2 sprintf-js@1.1.2 request@2.88.0 request-promise-native@1.0.7 app-module-path@2.2.0 @types/sprintf-js@1.1.2 @types/request-promise-native@1.0.15 @types/node@11.12.2 @types/core-js@2.5.0 jimp@0.6.1

cd ..
echo Uninstalling modules...
rmdir /S /Q node_modules
del /Q package-lock.json
del /Q package.json
call npm init -y
call npm install %MODULES%
echo Installed!

popd