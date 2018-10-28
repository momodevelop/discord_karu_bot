import { common } from 'common/common';
import { SplatoonProc, eBattleTypes } from 'responses/common/SplatoonHelper';
import { RichEmbedWrapper as Rewrap } from 'responses/common/EmbedHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'
import { Client, Message, RichEmbed } from 'discord.js';
import { iSchedule, iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';
import { cSplatoonInkApi } from 'libs/SplatoonInkApi/cSplatoonInkApi';
import { Globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';

class cResponse extends cResponseBase {

	private readonly title: string = "(ﾉ≧∇≦)ﾉ ﾐ GACHI!!!"
	private readonly conditions: string[][] = [
		["ranked", "rank", "gachi"]
	];

	public async exec(params: cCallbackParams): Promise<boolean> {
		return SplatoonProc(this.conditions, params, this.title, eBattleTypes.GACHI, () => {
			return 0;
		});
	}
	
}

export = function () {
	return new cResponse();
}