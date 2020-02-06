import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams';
import * as Battle from 'splatoon/Battle';
import * as Weapons from 'splatoon/Weapons';
import * as Utils from 'splatoon/Utils';
import { Message } from 'discord.js';


class cResponse implements ResponseBase<CallbackParams> {

    public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, ["random weapon"])) {
			return false;
		}

        let weapon = Weapons.getRandomWeapon()
		await Utils.getEmbedRandomWeapon(params.msg, weapon);
		return true;
	}
	
}

export default function () {
	return new cResponse();
}