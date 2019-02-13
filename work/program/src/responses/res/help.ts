import { common } from 'common/common';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'

class cResponse extends cResponseBase {

	public async exec(params: cCallbackParams): Promise<boolean> {
		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["help"])) {
			params.msg.channel.send("Coming soon! Or remind Momo to do it XD");
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}