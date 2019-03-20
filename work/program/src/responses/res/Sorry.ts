import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'
import { randMsg } from 'messages/MsgArraySorry'

class cResponse extends ResponseBase {

	public async exec(params: CallbackParams): Promise<boolean> {
		let f = hasWords;
		let c = params.msg.content;
		if (hasWords(c, ["wrong", "no", "bad"])) {
			params.msg.channel.send(randMsg());
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}