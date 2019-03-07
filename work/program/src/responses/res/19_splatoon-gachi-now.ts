import { SplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams'

class cResponse extends ResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.GACHI;
	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!"
	private readonly conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType]
	];

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		await SplatoonHelper.getEmbedScheduleNow(params, this.title, this.battleType);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}