//https://github.com/misenhower/splatoon2.ink/wiki/Data-access-policy
import { Battle } from 'responses/common/SplatoonData'
import { Utils } from 'responses/common/SplatoonUtils';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams';
import { hasWords } from 'common/common';

class cResponse extends ResponseBase {

	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ TURF!!!"
	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.LEAGUE);

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, this.battleInfo.conditions)) {
			return false;
		}

		await Utils.getEmbedScheduleNow(params, this.title, this.battleInfo.type);
		return true;
	}
}

export = function () {
	return new cResponse();
}