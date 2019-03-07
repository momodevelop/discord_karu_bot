
import { cSplatoonHelper, eBattleTypes } from 'responses/common/cSplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { getRuleByCondition, cRuleInfo } from 'responses/common/SplatoonData'

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.GACHI;
	private conditions: string[][] = [
		cSplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
		["next"],
	];

	public async exec(params: cCallbackParams): Promise<boolean> {


		if (!cSplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		// Check for rule types
		let ruleInfo: cRuleInfo | null = getRuleByCondition(params.msg.content);
		if (ruleInfo == null) {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Ranked Battle is...!";
			await cSplatoonHelper.GetEmbedScheduleNext(params, title, this.battleType);
		}

		else {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Ranked " + ruleInfo.Name + " is...!";
			await cSplatoonHelper.GetEmbedScheduleNextRule(params, title, this.battleType, ruleInfo.Type);
		}

		return true;
	}

}

export = function () {
	return new cResponse();
}