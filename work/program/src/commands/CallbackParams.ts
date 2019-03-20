import { Client, Message } from 'discord.js';
import { CommandCallbackParams } from 'libs/Commander/CommandCallbackParams';

export class CallbackParams implements CommandCallbackParams {
	public bot: Client;
	public msg: Message;
	public args: string[];

	constructor(bot: Client, msg: Message, args: string[]) {
		this.bot = bot;
		this.msg = msg;
		this.args = args;
	}
}