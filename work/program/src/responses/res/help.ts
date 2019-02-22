import { common } from 'common/common';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'

class cResponse extends cResponseBase {

	public async exec(params: cCallbackParams): Promise<boolean> {
		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["help"])) {
			params.msg.channel.send("（｀・ω・´）~★ Hey hey hey! I'm KaruBot, a bot created my Momo🍑!\nJust try asking me about Splatoon 2's schedules like so:\n'```Karu, what's on league?'```\nI'll try my best to understand you!!");
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}