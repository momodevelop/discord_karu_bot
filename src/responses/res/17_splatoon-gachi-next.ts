import { common } from 'common/common';
import { SplatoonHelper, eBattleTypes, eRuleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

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
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next gachi i";
			SplatoonHelper.SplatoonProc(params, title, eBattleTypes.GACHI, () => {
				return 1;
			});
		}

		else {
//			SplatoonHelper.SplatoonProc(params, title, eBattleTypes.GACHI, () => {
//				return 0;
//			});
		}

		return true;
	}
	
}

export = function () {
	return new cResponse();
}