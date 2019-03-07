import { Client, Message } from 'discord.js';
import { iCommandCallbackParams } from 'libs/Commander/iCommandCallbackParams';

export class CallbackParams implements iCommandCallbackParams {
	public bot: Client;
	public msg: Message;
	public args: string[];

	constructor(bot: Client, msg: Message, args: string[]) {
		this.bot = bot;
		this.msg = msg;
		this.args = args;
	}
}