
import { SplatoonHelper } from 'responses/common/SplatoonHelper';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams';
import { hasWords } from 'common/common';
import { Battle, Rule } from 'responses/common/SplatoonData';

class cResponse extends ResponseBase {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.GACHI);

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, this.battleInfo.conditions.concat(["next"]))) {
			return false;
		}

		// Check for rule types
		let ruleInfo: Rule.Info | null = Rule.getRuleByCondition(params.msg.content);
		if (ruleInfo == null) {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Ranked Battle is...!";
			await SplatoonHelper.getEmbedScheduleNext(params, title, this.battleInfo.type);
		}

		else {
			let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Ranked " + ruleInfo.name + " is...!";
			await SplatoonHelper.getEmbedScheduleNextRule(params, title, this.battleInfo.type, ruleInfo.type);
		}

		return true;
	}

}

export = function () {
	return new cResponse();
}