import { common } from 'common/common';
import { SplatoonHelper, eBattleTypes, eRuleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.REGULAR;
	private conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
		["next"],
	];

	public async exec(params: cCallbackParams): Promise<boolean> {


		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}


		// Check for rule types
		let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Turf Wars is...!";
		await SplatoonHelper.SplatoonProc(params, title, this.battleType, () => {
			return 1;
		});

		return true;
	}
	
}

export = function () {
	return new cResponse();
}