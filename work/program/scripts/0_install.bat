@echo off
Pushd "%~dp0"


set MODULES=discord.js@11.5.1 request-promise-native@1.0.7 sprintf-js@1.1.2 request@2.88.0 app-module-path@2.2.0 jimp@0.6.4 @types/request-promise-native@1.0.16 @types/core-js@2.5.0 @types/node@12.0.4 @types/sprintf-js@1.1.2 merge-img@2.1.3  

cd ..
echo Uninstalling modules...
rmdir /S /Q node_modules
del /Q package-lock.json
del /Q package.json
call npm init -y
call npm install %MODULES%
echo Installed!

popd