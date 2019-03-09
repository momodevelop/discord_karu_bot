import { parseTime, hasWords } from 'common/common';
import { Utils } from 'responses/common/SplatoonUtils';
import { Battle, Rule } from 'responses/common/SplatoonData'
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'
import { sprintf } from 'sprintf-js'

// Given a specific time, give the map.
// case 1: karu gachi 10am/pm
class cResponse extends ResponseBase {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.LEAGUE);

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, this.battleInfo.conditions)) {
			return false;
		}

		// Check for time
		let date: Date | null = parseTime(params.msg.content);
		if (date != null) {
			let title: string = sprintf("(ﾉ≧∇≦)ﾉ ﾐ The " + this.battleInfo.name + " Battle at %02d %02dhrs is...!", date.getHours(), date.getMinutes());
			await Utils.getEmbedScheduleByTime(params, title, this.battleInfo.type, date);
			return true;
		}

		// Check for rule types and next
		if (hasWords(params.msg.content, ["next"])) {
			let ruleInfo: Rule.Info | null = Rule.getTypeByCondition(params.msg.content);
			if (ruleInfo == null) {
				let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next " + this.battleInfo.name + " Battle is...!";
				await Utils.getEmbedScheduleNext(params, title, this.battleInfo.type);
				return true;
			}

			else {
				let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next " + this.battleInfo.name + " " + ruleInfo.name + " is...!";
				await Utils.getEmbedScheduleNextRule(params, title, this.battleInfo.type, ruleInfo.type);
				return true;
			}
		}

		// Default: Give the current schedule
		let title: string = "(ﾉ≧∇≦)ﾉ ﾐ LEAGUE!!!";
		await Utils.getEmbedScheduleNow(params, title, this.battleInfo.type);
		return true;
	}
	
}

export = function () {
	return new cResponse();
}