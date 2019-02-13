import { common } from 'common/common';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayHi'

class cResponse extends cResponseBase {

	public async exec(params: cCallbackParams): Promise<boolean> {
		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["hi", "hello", "yo"])) {
			params.msg.channel.send(rand_msg());
			return true;
		}

		return false;
	}
}

export = function () {
	return new cResponse();
}