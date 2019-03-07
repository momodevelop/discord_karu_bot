cd ..
rmdir /S /Q node_modules
del /Q package.json
del /Q yarn.lock

call yarn init -y
call yarn add --modules-folder node_modules merge-img discord.js dotenv sprintf-js request request-promise-native app-module-path @types/sprintf-js @types/request-promise-native @types/node @types/core-js @types/dotenv jimp
pause