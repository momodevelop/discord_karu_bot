import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams';
import * as Battle from 'splatoon/Battle';
import * as Map from 'splatoon/Map';
import * as Utils from 'splatoon/Utils';
import { Message } from 'discord.js';


async function replyWithMapList(msg: Message) {
	let reply: string = "Try typing 'callout' with one of the names here, like 'karu callout reef' to show The Reef callout map!\n ```";
	for(let key of Map.getMapKeys() ) {
		let info = Map.getMap(key);
		if ( info )
			reply += key + " - " + info.enName + "\n";
	}
	reply += "```";
	await msg.channel.send(reply);
}

class cResponse implements ResponseBase<CallbackParams> {

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, ["callout"])) {
			return false;
		}

		// check for 'list' keyword
		//if (hasWords(params.msg.content, ["list"])) {
		//	await replyWithMapList(params.msg);
		//		return true;
		//}


		for(let key of Map.getMapKeys() ) {
			if (hasWords(params.msg.content, [key]) ) {
				await Utils.getEmbedCallout(params.msg, "I have found the callout map!! ( •̀∀•́ ) ✧ﾄﾞﾔ ", key);
				return true;
			}
		}

		await replyWithMapList(params.msg);
		return true;
	}
	
}

export default function () {
	return new cResponse();
}