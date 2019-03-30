import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams'
import { randMsg } from 'messages/MsgArrayThanks'

class cResponse implements ResponseBase<CallbackParams> {

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

export default function () {
	return new cResponse();
}