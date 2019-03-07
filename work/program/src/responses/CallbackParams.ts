import { Client, Message } from 'discord.js';
import { iResponseCallbackParams } from 'libs/Responder/iResponseCallbackParams';

export class CallbackParams implements iResponseCallbackParams {
	public bot: Client;
	public msg: Message;

	constructor(bot: Client, msg: Message) {
		this.bot = bot;
		this.msg = msg;
	}
}