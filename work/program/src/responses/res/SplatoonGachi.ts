import { parseTime, hasWords } from 'common/Utils';
import { ResponseBase } from 'libs/Responder/Responder';
import { CallbackParams } from '../CallbackParams';
import { sprintf } from 'sprintf-js'
import * as Utils from 'splatoon/Utils';
import * as Battle from 'splatoon/Battle';
import * as Rule from 'splatoon/Rule';

// Given a specific time, give the map.
// case 1: karu gachi 10am/pm
class cResponse implements ResponseBase<CallbackParams> {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.GACHI);
	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, this.battleInfo.conditions)) {
			return false;
		}

		// Check for time
		let date: Date | null = parseTime(params.msg.content);
		if (date != null) {
			let title: string = sprintf("(ﾉ≧∇≦)ﾉ ﾐ The " + this.battleInfo.name + " Battle at %02d %02dhrs is...!", date.getHours(), date.getMinutes());
			await Utils.getEmbedScheduleByTime(params.msg, title, this.battleInfo.type, date);
			return true;
		}

		// Check for rule types and next
		if (hasWords(params.msg.content, ["next"])) {
			let ruleInfo: Rule.Info | null = Rule.getTypeByCondition(params.msg.content);
			if (ruleInfo == null) {
				let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next " + this.battleInfo.name + " Battle is...!";
				await Utils.getEmbedScheduleNext(params.msg, title, this.battleInfo.type);
				return true;
			}

			else {
				let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next " + this.battleInfo.name + " " + ruleInfo.name + " is...!";
				await Utils.getEmbedScheduleNextRule(params.msg, title, this.battleInfo.type, ruleInfo.type);
				return true;
			}
		}

		// Default: Give the current schedule
		let title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!";
		await Utils.getEmbedScheduleNow(params.msg, title, this.battleInfo.type);
		return true;
	}
	
}

export default function () {
	return new cResponse();
}