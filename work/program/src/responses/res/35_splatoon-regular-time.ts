import { parseTime } from 'common/common';
import { SplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'
import { sprintf } from 'sprintf-js'

// Given a specific time, give the map.
// case 1: karu gachi 10am/pm
class cResponse extends ResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.REGULAR;
	private conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
	];

	

	public async exec(params: CallbackParams): Promise<boolean> {

		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		let date: Date | null = parseTime(params.msg.content);
		if (date == null) {
			return false;
		}

		let title: string = sprintf("(ﾉ≧∇≦)ﾉ ﾐ The Turf Wars at the %02d%02dhrs is...!", date.getHours(), date.getMinutes());
		await SplatoonHelper.getEmbedScheduleByTime(params, title, this.battleType, date);
	

		return true;
	}
	
}

export = function () {
	return new cResponse();
}