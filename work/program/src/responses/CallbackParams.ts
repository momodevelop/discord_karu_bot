import { Client, Message } from 'discord.js';
import { ResponseCallbackParams } from 'libs/Responder/ResponseCallbackParams';

export class CallbackParams implements ResponseCallbackParams {
	public bot: Client;
	public msg: Message;

	constructor(bot: Client, msg: Message) {
		this.bot = bot;
		this.msg = msg;
	}
}