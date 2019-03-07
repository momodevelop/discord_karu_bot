import { SplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams';

class cResponse extends ResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.REGULAR;
	private conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
		["next"],
	];

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Turf Wars is...!";
		await SplatoonHelper.getEmbedScheduleNext(params, title, this.battleType);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}