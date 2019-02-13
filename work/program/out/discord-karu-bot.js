"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Globals ////////////////////////////////
require('dotenv').config();
require('app-module-path').addPath(__dirname);
// Load libs ////////////////////////////////
const discord_js_1 = require("discord.js");
const cResponder_1 = require("libs/Responder/cResponder");
const Globals_1 = require("globals/Globals");
const cCallbackParams_1 = require("responses/cCallbackParams");
//Set up global variables /////////////////////
Globals_1.Globals.Root = __dirname + "/";
// Commander ////////////////////////////////////
//let commander: cCommander = new cCommander();
//commander.ParseDir(__dirname + '/commands/cmd/');
// Responder //////////////////////////////////
let responder = new cResponder_1.cResponder();
responder.ParseDir(__dirname + '/responses/res/');
// Discord bot ////////////////////////////
//const prefix = process.env.PREFIX || "karu,"
const bot = new discord_js_1.Client();
function onMessage(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        // reject self
        if (msg.author.id === bot.user.id) {
            return;
        }
        /*if (msg.content.startsWith(prefix)) {
            console.info('I\'m called! -> ' + msg.content);
    
            let args: string[] = msg.content.substring(prefix.length).match(/(?:[^\s"]+\b|(")[^"]*("))+|[=!&|~]/g) || [];
            if (!args.length) {
                return;
            }
    
            let command: string = args[0];
            args.shift();
    
            commander.GetCommand(command, new cCallbackParams(bot, msg, args));
        }
    
        else*/
        if (msg.content.match(/\b(karu)\b/gi)) {
            yield responder.Exec(new cCallbackParams_1.cCallbackParams(bot, msg));
        }
        return;
    });
}
bot.login(process.env.TOKEN)
    .then(() => {
    console.info("KaruBot up and ready to work! ^^b");
    bot.on('message', onMessage);
})
    .catch((e) => {
    console.info(e);
    process.exit(0);
});
//# sourceMappingURL=discord-karu-bot.js.map