//https://github.com/misenhower/splatoon2.ink/wiki/Data-access-policy

import { cSplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.REGULAR;
	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ TURF!!!"
	private readonly conditions: string[][] = [
		cSplatoonHelper.CONDITION_BATTLE_TYPE[eBattleTypes.REGULAR]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {				
		if (!cSplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		await cSplatoonHelper.GetEmbedScheduleNow(params, this.title, this.battleType);
		return true;
	}
}

export = function () {
	return new cResponse();
}