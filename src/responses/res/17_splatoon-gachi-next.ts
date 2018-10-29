import { common } from 'common/common';
import { SplatoonHelper, eBattleTypes, eRuleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';

class cResponse extends cResponseBase {

	private conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[eBattleTypes.GACHI],
		["next"],
	];

	public async exec(params: cCallbackParams): Promise<boolean> {


		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}


		// Check for rule types
		let rule: eRuleTypes | null = SplatoonHelper.GetRuleByCondition(params.msg.content);
		if (rule == null) {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next gachi is...!";
			SplatoonHelper.SplatoonProc(params, title, eBattleTypes.GACHI, () => {
				return 1;
			});
		}

		else {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next gachi is...!";
			SplatoonHelper.SplatoonProc(params, title, eBattleTypes.GACHI, (info: iScheduleInfo[]) => {
				let index = -1;
				for (let i = 0; i < info.length; ++i) {
					if (info[i].rule.key == SplatoonHelper.RULES_KEY[rule!]) {
						index = i;
						break;
					}
				}
				return index;
			});
		}

		return true;
	}
	
}

export = function () {
	return new cResponse();
}