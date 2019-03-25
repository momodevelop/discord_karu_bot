import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams'

class cResponse implements ResponseBase<CallbackParams> {

	public async exec(params: CallbackParams): Promise<boolean> {
		let c = params.msg.content;
		if (hasWords(c, ["pat", "pet", "pats", "pets"])) {
			params.msg.channel.send("Ehehe :kissing_smiling_eyes:");
			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}