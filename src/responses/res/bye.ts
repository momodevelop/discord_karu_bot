import { common } from 'common/common';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayBye'

class cResponse extends cResponseBase {

	public async exec(params: cCallbackParams): Promise<boolean> {
		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["bye", "goodbye", "cya"])) {
			params.msg.channel.send(rand_msg());
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}