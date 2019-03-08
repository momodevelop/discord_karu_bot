import { SplatoonHelper } from 'responses/common/SplatoonHelper';
import { Battle } from 'responses/common/SplatoonData'
import { ResponseBase } from 'libs/Responder/ResponseBase';
import { CallbackParams } from '../CallbackParams';
import { hasWords } from 'common/common';

class cResponse extends ResponseBase {

	private readonly battleInfo: Battle.Info = Battle.getInfo(Battle.Types.LEAGUE);

	public async exec(params: CallbackParams): Promise<boolean> {
		if (!hasWords(params.msg.content, this.battleInfo.conditions.concat(["next"]))) {
			return false;
		}


		let title: string = "(ﾉ≧∇≦)ﾉ ﾐ The next Turf Wars is...!";
		await SplatoonHelper.getEmbedScheduleNext(params, title, this.battleInfo.type);

		return true;
	}
	
}

export = function () {
	return new cResponse();
}