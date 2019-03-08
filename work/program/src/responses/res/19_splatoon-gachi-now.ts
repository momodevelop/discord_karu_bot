import { Utils } from 'responses/common/SplatoonUtils';
import { Battle } from 'responses/common/SplatoonData'
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'
import { hasWords } from 'common/common';

class cResponse extends ResponseBase {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.GACHI);
	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!"

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