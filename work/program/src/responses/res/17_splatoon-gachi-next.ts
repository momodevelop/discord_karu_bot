import { common } from 'common/common';
import { SplatoonHelper, eBattleTypes, eRuleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.GACHI;
	private conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
		["next"],
	];

	public async exec(params: cCallbackParams): Promise<boolean> {


		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}


		// Check for rule types
		let rule: eRuleTypes | null = SplatoonHelper.GetRuleByCondition(params.msg.content);
		if (rule == null) {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Ranked Battle is...!";
			await SplatoonHelper.SplatoonNextAnyProc(params, title, this.battleType);
		}

		else {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Ranked " + SplatoonHelper.RULES_NAME[rule] + " is...!";
			await SplatoonHelper.SplatoonNextRuleProc(params, title, this.battleType, rule);
		}

		return true;
	}
	
}

export = function () {
	return new cResponse();
}