import { common } from 'common/common';
import { cCommandBase } from 'libs/Commander/cCommandBase';
import { cCallbackParams } from 'commands/cCallbackParams';

class cCommand extends cCommandBase {
	public readonly name: string = "help";

	public async exec(params: cCallbackParams): Promise<void> {
		await params.msg.channel.send("（｀・ω・´）~★ Hey hey hey! I'm **KaruBot**, a bot created by Momo 🍑!\nJust try asking me about Splatoon 2's schedules like so: ```Karu, what's on league?``` I'll try my best to understand you!! :kissing_smiling_eyes: ");
	}
}

export = function () {
	return new cCommand();
}
