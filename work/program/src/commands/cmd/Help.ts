import { CommandBase } from 'libs/Commander/Commander';
import { CallbackParams } from 'commands/CallbackParams';

class cCommand implements CommandBase<CallbackParams> {
	public readonly name: string = "help";

	public async exec(params: CallbackParams): Promise<void> {
		await params.msg.channel.send(
			"（｀・ω・´）~★ Hey hey hey! I'm **KaruBot**, a bot created by Momo 🍑!\n\
Just try asking me about Splatoon 2's schedules like so: ```Karu, what's on league?``` \n\
You can also ask for map callouts like so: ```Karu, callout reef```\n\
I can even randomize weapons for with if you ask: ```Karu, gimma a random weapon```\n\
I'll try my best to understand you!! :kissing_smiling_eyes: ");
	}
}

export default function () {
	return new cCommand();
}
