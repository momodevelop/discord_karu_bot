import { hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams';
import * as Battle from 'splatoon/Battle';
import * as Map from 'splatoon/Map';
import * as Utils from 'splatoon/Utils';


class cResponse implements ResponseBase<CallbackParams> {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.GACHI);
	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, ["callout"])) {
			return false;
		}

		// check for 'list' keyword
		if (hasWords(params.msg.content, ["list"])) {
			let reply: string = "Here you go!!\n ```";
			for(let key of Map.getMapKeys() ) {
				let info = Map.getMap(key);
				if ( info )
					reply += key + " - " + info.enName + "\n";
			}
			reply += "```";
			await params.msg.channel.send(reply);
			return true;
		}


		for(let key of Map.getMapKeys() ) {
			if (!hasWords(params.msg.content, [key]) ) {
				Utils.getEmbedCallout(params.msg, "Callout!!", key);
				return true;
			}
		}



		return true;
	}
	
}

export default function () {
	return new cResponse();
}