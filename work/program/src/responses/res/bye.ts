import { common } from 'common/common';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { CallbackParams } from '../CallbackParams'
import { randMsg } from 'messages/MsgArrayBye'

class cResponse extends cResponseBase {

	public async exec(params: CallbackParams): Promise<boolean> {
		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["bye", "goodbye", "cya"])) {
			params.msg.channel.send(randMsg());
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}