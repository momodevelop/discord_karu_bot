import { parseTime, hasWords } from 'common/common';
import { SplatoonHelper } from 'responses/common/SplatoonHelper';
import { Battle } from 'responses/common/SplatoonData'
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams';
import { sprintf } from 'sprintf-js'

// Given a specific time, give the map.
// case 1: karu gachi 10am/pm
class cResponse extends ResponseBase {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.GACHI);

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, this.battleInfo.conditions)) {
			return false;
		}

		let date: Date | null = parseTime(params.msg.content);
		if (date == null) {
			return false;
		}

		let title: string = sprintf("(ﾉ≧∇≦)ﾉ ﾐ The Ranked Battle at the %02d%02dhrs is...!", date.getHours(), date.getMinutes());
		await SplatoonHelper.getEmbedScheduleByTime(params, title, this.battleInfo.type, date);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}