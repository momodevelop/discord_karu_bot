import { SplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

class cResponse extends cResponseBase {

	private readonly battleType: eBattleTypes = eBattleTypes.GACHI;
	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!"
	private readonly conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {
		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		await SplatoonHelper.SplatoonNowProc(params, this.title, this.battleType);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}