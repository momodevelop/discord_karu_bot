// All the common shit
import { common } from 'common/common';
import { SplatoonGachiCommon, SplatoonLeagueCommon, SplatoonRegularCommon } from 'responses/common/SplatoonCommon';
import { RichEmbedWrapper as Rewrap } from 'responses/common/EmbedHelper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'
import { Client, Message, RichEmbed } from 'discord.js';
import { iSchedule, iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';
import { cSplatoonInkApi } from 'libs/SplatoonInkApi/cSplatoonInkApi';
import { Globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';

export enum eBattleTypes {
	REGULAR,
	GACHI,
	LEAGUE	
}

function GetCommonFuncByType(type: eBattleTypes) {
	let sc = SplatoonRegularCommon;
	switch (type) {
		case eBattleTypes.GACHI:
			sc = SplatoonGachiCommon;
			break;
		case eBattleTypes.LEAGUE:
			sc = SplatoonLeagueCommon;
			break;
	}
	return sc;
}
function GetScheduleFuncByType(type: eBattleTypes, r: iSchedule): iScheduleInfo[] {
	let ret = r.regular;
	switch (type) {
		case eBattleTypes.GACHI:
			ret = r.gachi;
			break;
		case eBattleTypes.LEAGUE:
			ret = r.league;
			break;
	}
	return ret;
}
function ConditionProc(conditions: string[][], content: string): boolean {
	const f = common.has_words;
	for (let i = 0; i < conditions.length; ++i) {
		if (!f(content, conditions[i])) {
			return false
		}
	}
	return true;
 
}

export async function SplatoonProc(conditions: string[][], params: cCallbackParams, title: string, type: eBattleTypes, scheduleSelectorFunc: () => number): Promise<boolean> {
	if (!ConditionProc(conditions, params.msg.content)) {
		return false;
	}

	const sc = GetCommonFuncByType(type);

	let currentMessage: Message = <Message>(await params.msg.channel.send("（｀・ω・´）Gimme a sec..."));

	// Call API to get the schedule and locale info
	const localeJp: any = await cSplatoonInkApi.getLocaleJp();
	const r: iSchedule = await cSplatoonInkApi.getSchedule();
	const result: iScheduleInfo = GetScheduleFuncByType(type, r)[scheduleSelectorFunc()];
	const stageAUrl: string = sc.URL_SPLATOON_WIKI + result.stage_a.name.replace(/\s/g, "_");
	const stageBUrl: string = sc.URL_SPLATOON_WIKI + result.stage_b.name.replace(/\s/g, "_");
	const ruleUrl: string = sc.URL_SPLATOON_WIKI + result.rule.name.replace(/\s/g, "_");
	const stageAPath: string = Globals.ImgStagesPath + result.stage_a.name + ".jpg";
	const stageBPath: string = Globals.ImgStagesPath + result.stage_b.name + ".jpg";

	await currentMessage.edit("(｀・ω・´)9  Just a bit more...");

	let embed: Rewrap = new Rewrap();
	embed.RichEmbed.setTitle(title);
	embed.RichEmbed.setColor(sc.COLOR);
	(type != eBattleTypes.REGULAR) && embed.RichEmbed.addField("Mode:", sprintf("[%s](%s)\n%s\n", result.rule.name, ruleUrl, localeJp["rules"][result.rule.key].name));
		
	embed.RichEmbed
		.addField("Time: ", sprintf("%s - %s", common.simplify_time(result.start_time), common.simplify_time(result.end_time)))
		.addField("Maps:", sprintf("[%s](%s)\n%s\n[%s](%s)\n%s",
			result.stage_a.name,
			stageAUrl,
			localeJp["stages"][result.stage_a.id].name,
			result.stage_b.name,
			stageBUrl,
			localeJp["stages"][result.stage_b.id].name,
		));


	await embed.SetAuthorWithImg(Globals.ImgPath + sc.IMG_AUTHOR, sc.IMG_AUTHOR, sc.NAME_AUTHOR);
	await embed.SetThumbnailImg(Globals.ImgPath + sc.IMG_THUMBNAIL, sc.IMG_THUMBNAIL);
	await embed.SetImgMultiple([stageAPath, stageBPath], Globals.ImgOutPath + sc.IMG_OUTPUT_NAME, sc.IMG_OUTPUT_NAME);
	await currentMessage.edit("(;;｀・ω・´)9  Almost...there...");
	await params.msg.channel.send(embed.Finalize());
	await currentMessage.delete();

	return true;
}

