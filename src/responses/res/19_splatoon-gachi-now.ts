import { SplatoonHelper, eBattleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

class cResponse extends cResponseBase {

	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!"
	private readonly conditions: string[][] = [
		SplatoonHelper.CONDITION_BATTLE_TYPE[eBattleTypes.GACHI]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {
		if (!SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
			return false;
		}

		SplatoonHelper.SplatoonProc(params, this.title, eBattleTypes.GACHI, () => {
			return 0;
		});

		return true;
	}
	
}

export = function () {
	return new cResponse();
}