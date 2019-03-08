// Globals ////////////////////////////////
require('dotenv').config();
require('app-module-path').addPath(__dirname);

// Load libs ////////////////////////////////
import { Client, Message } from 'discord.js';
import { Commander } from 'libs/Commander/Commander';
import { Responder } from 'libs/Responder/Responder';
import { globals } from 'globals/Globals';
import { CallbackParams as commandCallbackParams } from 'commands/CallbackParams';
import { CallbackParams as responseCallbackParams } from 'responses/CallbackParams';

//Set up global variables /////////////////////
globals.Root = __dirname + "/";

let commander: Commander = new Commander();
let responder: Responder = new Responder();

// Discord bot ////////////////////////////
const prefix: string = process.env.PREFIX || "";
if (prefix == "") {
	console.error("Prefix not defined!")
	process.exit(0);
}
const bot: Client = new Client();

async function onMessage(msg: Message): Promise<void> {
	try {
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

			if (! await commander.exec(command, new commandCallbackParams(bot, msg, args))) {
				await responder.exec(new responseCallbackParams(bot, msg));
			}
		}

		else if (msg.content.match(/\b(karu)\b/gi)) {
			await responder.exec(new responseCallbackParams(bot, msg));
		}
	}
	catch (e) {
		console.error(e)
	}
}

async function onLoad(): Promise<void> {
	try {
		await commander.parseDir(__dirname + '/commands/cmd/');
		await responder.parseDir(__dirname + '/responses/res/');
		await bot.login(process.env.TOKEN);
		console.info("KaruBot up and ready to work! ^^b");
		bot.user.setActivity("type '" + prefix + " help'");
		bot.on('message', onMessage);
	}
	catch (e) {
		console.info(e);
		process.exit(0);
	}
}

onLoad();


