// All the common shit
import { common } from 'common/common';
import { RichEmbedWrapper as Rewrap } from 'common/RichEmbedWrapper';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'
import { Client, Message, RichEmbed } from 'discord.js';
import { iSchedule, iScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';
import { cSplatoonInkApi } from 'libs/SplatoonInkApi/cSplatoonInkApi';
import { Globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';



export enum eBattleTypes {
	REGULAR = 0,
	GACHI,
	LEAGUE	
}

export enum eRuleTypes {
	RAINMAKER = 0,
	CLAM_BLITZ,
	TOWER_CONTROL,
	SPLAT_ZONES
}



export class SplatoonHelper {

	public static readonly COLOR: [number, number, number][] = [
		[207, 246, 34],
		[245, 73, 16],
		[240, 45, 125]
	];

	public static readonly CONDITION_FOR_RULES: string[][] = [
		["rainmaker", "hoko"],
		["clam blitz", "asari"],
		["tower", "yagura"],
		["zones", "zone", "area"],
	];

	public static readonly CONDITION_BATTLE_TYPE: string[][] = [
		["regular", "turf"],
		["gachi", "ranked", "rank"],
		["league"],
	];

	public static readonly RULES_KEY: string[] = [
		"rainmaker",
		"clam blitz",
		"tower_control",
		"splat_zones"
	];

	public static readonly RULES_NAME: string[] = [
		"Rainmaker",
		"Clam",
		"Tower Control",
		"Splat Zones"
	];

	private static readonly IMG_THUMBNAIL: string[] = [
		"regular.png", "gachi.png", "league.png"
	];

	private static readonly IMG_OUTPUT_NAME: string[] = [
		"out_regular.jpg", "out_gachi.jpg", "out_league.jpg"
	]

	private static readonly NAME_AUTHOR: string = "Karu";
	private static readonly URL_SPLATOON_WIKI: string = "https://splatoonwiki.org/wiki/";
	private static readonly IMG_AUTHOR: string = "karu.png"
	private static GetScheduleFuncByType(type: eBattleTypes, r: iSchedule): iScheduleInfo[] {
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

	public static GetRuleByCondition(content: string): eRuleTypes | null {
		if (this.ConditionProc(this.CONDITION_FOR_RULES[eRuleTypes.RAINMAKER], content)) {
			return eRuleTypes.RAINMAKER;
		}
		else if (this.ConditionProc(this.CONDITION_FOR_RULES[eRuleTypes.CLAM_BLITZ], content)) {
			return eRuleTypes.CLAM_BLITZ;
		}
		else if (this.ConditionProc(this.CONDITION_FOR_RULES[eRuleTypes.SPLAT_ZONES], content)) {
			return eRuleTypes.SPLAT_ZONES;
		}
		else if (this.ConditionProc(this.CONDITION_FOR_RULES[eRuleTypes.TOWER_CONTROL], content)) {
			return eRuleTypes.TOWER_CONTROL;
		}
		return null;
	}

	public static ConditionsProc(conditions: string[][], content: string): boolean {
		const f = common.has_words;
		for (let i = 0; i < conditions.length; ++i) {
			if (!this.ConditionProc(conditions[i], content)) {
				return false;
			}
		}
		return true;

	}

	public static ConditionProc(conditions: string[], content: string): boolean {
		return common.has_words(content, conditions);
	}


	public static async SplatoonProc(params: cCallbackParams, title: string, type: eBattleTypes, scheduleSelectorFunc: (info: iScheduleInfo[]) => number) {


		let currentMessage: Message = <Message>(await params.msg.channel.send("（｀・ω・´）Gimme a sec..."));

		

		// Call API to get the schedule and locale info
		const localeJp: any = await cSplatoonInkApi.getLocaleJp();
		const r: iSchedule = await cSplatoonInkApi.getSchedule();

		

		const results: iScheduleInfo[] = this.GetScheduleFuncByType(type, r);
		let index: number = scheduleSelectorFunc(results);
		if (index < 0) {
			await currentMessage.edit("(´・ω・`) Sorry...something went wrong...");
			return;
		}

		const result: iScheduleInfo = results[index];
		const stageAUrl: string = this.URL_SPLATOON_WIKI + result.stage_a.name.replace(/\s/g, "_");
		const stageBUrl: string = this.URL_SPLATOON_WIKI + result.stage_b.name.replace(/\s/g, "_");
		const ruleUrl: string = this.URL_SPLATOON_WIKI + result.rule.name.replace(/\s/g, "_");
		const stageAPath: string = Globals.ImgStagesPath + result.stage_a.name + ".jpg";
		const stageBPath: string = Globals.ImgStagesPath + result.stage_b.name + ".jpg";

		await currentMessage.edit("(｀・ω・´)9  Just a bit more...");

		let embed: Rewrap = new Rewrap();
		embed.RichEmbed.setTitle(title);
		embed.RichEmbed.setColor(this.COLOR[type]);
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


		await embed.SetAuthorWithImg(Globals.ImgPath + this.IMG_AUTHOR, this.IMG_AUTHOR, this.NAME_AUTHOR);
		await embed.SetThumbnailImg(Globals.ImgPath + this.IMG_THUMBNAIL[type], this.IMG_THUMBNAIL[type]);
		await embed.SetImgMultiple([stageAPath, stageBPath], Globals.ImgOutPath + this.IMG_OUTPUT_NAME[type], this.IMG_OUTPUT_NAME[type]);
		await currentMessage.edit("(;;｀・ω・´)9  Almost...there...");
		await params.msg.channel.send(embed.Finalize());
		await currentMessage.delete();

	}
}








