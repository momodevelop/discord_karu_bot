// All the common shit
import { hasWords, simplifyTime } from 'common/common';
import { RichEmbedWrapper as Rewrap } from 'common/RichEmbedWrapper';
import { CallbackParams } from '../CallbackParams';
import { Message} from 'discord.js';
import { Schedule, ScheduleInfo } from 'libs/SplatoonInkApi/SplatoonInkDefines';
import { SplatoonInkApi } from 'libs/SplatoonInkApi/SplatoonInkApi';
import { globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';
import { RuleTypes, getRuleInfo, RuleInfo } from 'responses/common/SplatoonData'

export enum eBattleTypes {
	REGULAR = 0,
	GACHI,
	LEAGUE	
}

export class SplatoonHelper {

	public static readonly COLOR: [number, number, number][] = [
		[207, 246, 34],
		[245, 73, 16],
		[240, 45, 125]
	];

	public static readonly CONDITION_BATTLE_TYPE: string[][] = [
		["regular", "turf"],
		["gachi", "ranked", "rank"],
		["league"],
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
	private static GetScheduleFuncByType(type: eBattleTypes, r: Schedule): ScheduleInfo[] {
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


	public static ConditionsProc(conditions: string[][], content: string): boolean {
		for (let i = 0; i < conditions.length; ++i) {
			if (!hasWords(content, conditions[i])) {
				return false;
			}
		}
		return true;

	}



	// Gets the stage details by time (using Date)
	public static async getEmbedScheduleByTime(params: CallbackParams, title: string, type: eBattleTypes, date: Date): Promise<void> {
		return await SplatoonHelper.getEmbedSchedule(params, title, type, (info: ScheduleInfo[]) => {
			let index = -1;
			// assumes that info time is form earliest of latest.
			for (let i = 0; i < info.length; ++i) {
				let timeDiff: number = info[i].end_time * 1000 - date.getTime();
				if (timeDiff > 0) {
					index = i;
					break;
				}
			}

			return index;
		});

	}

	// Gets the upcoming rule's stage details
	public static async getEmbedScheduleNextRule(params: CallbackParams, title: string, type: eBattleTypes, rule: RuleTypes): Promise<void> {
		return await SplatoonHelper.getEmbedSchedule(params, title, type, (info: ScheduleInfo[]) => {
			let index = -1;
			let ruleInfo: RuleInfo = getRuleInfo(rule);
			if (!ruleInfo) {
				return -1;
			}
			for (let i = 0; i < info.length; ++i) {
				if (info[i].rule.key == ruleInfo.Key) {
					index = i;
					break;
				}
			}
			return index;
		});
	}

	// Gets the upcoming stage details
	public static async getEmbedScheduleNext(params: CallbackParams, title: string, type: eBattleTypes): Promise<void> {
		return await SplatoonHelper.getEmbedSchedule(params, title, type, (info: ScheduleInfo[]) => {
			return 1;
		});
	}


	// Gets the current ongoing stage details
	public static async getEmbedScheduleNow(params: CallbackParams, title: string, type: eBattleTypes): Promise<void> {
		return await SplatoonHelper.getEmbedSchedule(params, title, type, (info: ScheduleInfo[]) => {
			return 0;
		});
	}

	public static async getEmbedSchedule(params: CallbackParams, title: string, type: eBattleTypes, scheduleSelectorFunc: (info: ScheduleInfo[]) => number) : Promise<void> {
		let currentMessage: Message = <Message>(await params.msg.channel.send("（｀・ω・´）Gimme a sec..."));
		try {
			// Call API to get the schedule and locale info
			const localeJp: any = await SplatoonInkApi.getLocaleJp();
			const r: Schedule = await SplatoonInkApi.getSchedule();

			const results: ScheduleInfo[] = this.GetScheduleFuncByType(type, r);
			let index: number = scheduleSelectorFunc(results);
			if (index < 0) {
				await currentMessage.edit("(´・ω・`) Sorry, I have no data on that...");
				return;
			}

			const result: ScheduleInfo = results[index];
			const stageAUrl: string = this.URL_SPLATOON_WIKI + result.stage_a.name.replace(/\s/g, "_");
			const stageBUrl: string = this.URL_SPLATOON_WIKI + result.stage_b.name.replace(/\s/g, "_");
			const ruleUrl: string = this.URL_SPLATOON_WIKI + result.rule.name.replace(/\s/g, "_");
			const stageAPath: string = globals.ImgStagesPath + result.stage_a.name + ".jpg";
			const stageBPath: string = globals.ImgStagesPath + result.stage_b.name + ".jpg";

			await currentMessage.edit("(｀・ω・´)9  Just a bit more...");

			let embed: Rewrap = new Rewrap();
			embed.RichEmbed.setTitle(title);
			embed.RichEmbed.setColor(this.COLOR[type]);
			(type != eBattleTypes.REGULAR) && embed.RichEmbed.addField("Mode:", sprintf("[%s](%s)\n%s\n", result.rule.name, ruleUrl, localeJp["rules"][result.rule.key].name));

			embed.RichEmbed
				.addField("Time: ", sprintf("%s - %s", simplifyTime(result.start_time), simplifyTime(result.end_time)))
				.addField("Maps:", sprintf("[%s](%s)\n%s\n[%s](%s)\n%s",
					result.stage_a.name,
					stageAUrl,
					localeJp["stages"][result.stage_a.id].name,
					result.stage_b.name,
					stageBUrl,
					localeJp["stages"][result.stage_b.id].name,
				));


			await embed.getAuthorWithImg(globals.ImgPath + this.IMG_AUTHOR, this.IMG_AUTHOR, this.NAME_AUTHOR);
			await embed.setThumbnailImg(globals.ImgPath + this.IMG_THUMBNAIL[type], this.IMG_THUMBNAIL[type]);
			await embed.setImgMultiple([stageAPath, stageBPath], globals.ImgOutPath + this.IMG_OUTPUT_NAME[type], this.IMG_OUTPUT_NAME[type]);
			await currentMessage.edit("(;;｀・ω・´)9  Almost...there...");
			await params.msg.channel.send(embed.finalize());
			await currentMessage.delete();
		}
		catch (e) {
			console.error(e);
			await currentMessage.edit("(´・ω・`) Call Momo...something went wrong...");
		}
	}
}








