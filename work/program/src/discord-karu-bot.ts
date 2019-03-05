// Globals ////////////////////////////////
require('dotenv').config();
require('app-module-path').addPath(__dirname);

// Load libs ////////////////////////////////
import { Client, Message } from 'discord.js';
import { cCommander } from 'libs/Commander/cCommander';
import { cResponder } from 'libs/Responder/cResponder';
import { Globals } from 'globals/Globals';
import { cCallbackParams as commandCallbackParams } from 'commands/cCallbackParams';
import { cCallbackParams as responseCallbackParams } from 'responses/cCallbackParams';
import { common } from 'common/common';

// Load messagees /////////////////////////////
import { rand_msg as msg_default } from 'messages/MsgArrayDefault'

//Set up global variables /////////////////////
Globals.Root = __dirname + "/";


// Commander ////////////////////////////////////
let commander: cCommander = new cCommander();
commander.ParseDir(__dirname + '/commands/cmd/');

// Responder //////////////////////////////////
let responder: cResponder = new cResponder();
responder.ParseDir(__dirname + '/responses/res/');

// Discord bot ////////////////////////////
const prefix = "karu"
const bot: Client = new Client();

async function onMessage(msg: Message): Promise<void> {
	// reject self
	if (msg.author.id === bot.user.id) {
		return;
	}
	
	if (msg.content.startsWith(prefix)) {
		console.info('I\'m called! -> ' + msg.content);

		let args: string[] = msg.content.substring(prefix.length).match(/(?:[^\s"]+\b|(")[^"]*("))+|[=!&|~]/g) || [];
		if (!args.length) {
			return;
		}

		let command: string = args[0];
		args.shift();

		if (! await commander.Exec(command, new commandCallbackParams(bot, msg, args))) {
			await responder.Exec(new responseCallbackParams(bot, msg));
		}
	}

	else if (msg.content.match(/\b(karu)\b/gi)) {
		await responder.Exec(new responseCallbackParams(bot, msg));
	}

	return;
}


bot.login(process.env.TOKEN)
	.then(() => {
		console.info("KaruBot up and ready to work! ^^b");
		bot.user.setActivity("type 'karu help'");
		bot.on('message', onMessage);
	})
	.catch((e: any) => {
		console.info(e);
		process.exit(0);
	});


