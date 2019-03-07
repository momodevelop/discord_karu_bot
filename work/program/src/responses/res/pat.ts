import { common } from 'common/common';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'
import { randMsg } from 'messages/MsgArrayThanks'

class cResponse extends ResponseBase {

	public async exec(params: CallbackParams): Promise<boolean> {
		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["pat", "pet", "pats", "pets"])) {
			params.msg.channel.send("Ehehe :kissing_smiling_eyes:");
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}