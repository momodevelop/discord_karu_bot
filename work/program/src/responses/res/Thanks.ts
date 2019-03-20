import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'
import { randMsg } from 'messages/MsgArrayThanks'

class cResponse extends ResponseBase {

	public async exec(params: CallbackParams): Promise<boolean> {
		let f = hasWords;
		let c = params.msg.content;
		if (hasWords(c, ["thank you", "thanks", "thx"]) && !hasWords(c, ["no"])) {
			params.msg.channel.send(randMsg());
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}