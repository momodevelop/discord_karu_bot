import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams'

class cResponse implements ResponseBase<CallbackParams> {

	public async exec(params: CallbackParams): Promise<boolean> {
		let f = hasWords;
		let c = params.msg.content;
		if (hasWords(c, ["miss you", "missed you"])) {
			await params.msg.channel.send("Aww I miss you too! :kissing_smiling_eyes:");
			return true;
		}
		return false;
	}
}

export default function () {
	return new cResponse();
}