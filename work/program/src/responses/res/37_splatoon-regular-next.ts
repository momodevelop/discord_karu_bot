import { cSplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.REGULAR;
	private conditions: string[][] = [
		cSplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
		["next"],
	];

	public async exec(params: cCallbackParams): Promise<boolean> {
		if (!cSplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Turf Wars is...!";
		await cSplatoonHelper.GetEmbedScheduleNext(params, title, this.battleType);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}