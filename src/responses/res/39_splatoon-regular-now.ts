//https://github.com/misenhower/splatoon2.ink/wiki/Data-access-policy

import { common } from 'common/common';
import { SplatoonProc, eBattleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';

class cResponse extends cResponseBase {

	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ TURF!!!"
	private readonly conditions: string[][] = [
		["regular", "turf"]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {				
		return SplatoonProc(this.conditions, params, this.title, eBattleTypes.REGULAR, () => {
			return 0;
		});
	}
}

export = function () {
	return new cResponse();
}