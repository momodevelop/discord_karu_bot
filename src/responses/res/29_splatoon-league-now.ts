import { common } from 'common/common';
import { RichEmbedWrapper as Rewrap } from 'responses/common/EmbedHelper';
import { SplatoonProc, eBattleTypes } from 'responses/common/SplatoonHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'
import { Client, Message, RichEmbed } from 'discord.js';
import { iSchedule, iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';
import { cSplatoonInkApi } from 'libs/SplatoonInkApi/cSplatoonInkApi';
import { Globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';

class cResponse extends cResponseBase {

	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ LEAGUE!!!"
	private readonly conditions: string[][] = [
		["league"]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {
		return SplatoonProc(this.conditions, params, this.title, eBattleTypes.LEAGUE, () => {
			return 0;
		});
	}
}

export = function () {
	return new cResponse();
}