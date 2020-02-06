// All the common shit
import { simplifyTime } from 'common/Utils';
import { RichEmbedWrapper as Rewrap } from 'common/RichEmbedWrapper';
import { Message} from 'discord.js';
import { Schedule, ScheduleInfo } from 'libs/SplatoonInkApi/SplatoonInkDefines';
import { SplatoonInkApi } from 'libs/SplatoonInkApi/SplatoonInkApi';
import { globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';
import * as Rule from './Rule';
import * as Battle from './Battle';
import * as Map from 'splatoon/Map';
import * as Weapon from 'splatoon/Weapons'

const NAME_AUTHOR: string = "Karu";
const URL_SPLATOON_WIKI: string = "https://splatoonwiki.org/wiki/";
const IMG_AUTHOR: string = "karu.png"
function getScheduleFuncByBattleType(battleType: Battle.Types, r: Schedule): ScheduleInfo[] {
	let ret: ScheduleInfo[] = r.regular;
	switch (battleType) {
		case Battle.Types.GACHI:
			ret = r.gachi;
			break;
		case Battle.Types.LEAGUE:
			ret = r.league;
			break;
		case Battle.Types.REGULAR:
			ret = r.regular;
			break;
	}
	return ret;
}
// Gets the stage details by time (using Date)
export async function getEmbedScheduleByTime(msg: Message, title: string, battleType: Battle.Types, date: Date): Promise<void> {
	return await getEmbedSchedule(msg, title, battleType, (info: ScheduleInfo[]) => {
		let index = -1;
		// assumes that info time is form earliest of latest.
		for (let i = 0; i < info.length; ++i) {
			let endTime: Date = new Date(info[i].end_time * 1000);
			let startTime: Date = new Date(info[i].start_time * 1000);

			let endTimeHours = endTime.getHours();
			let startTimeHours = startTime.getHours();

			// special case for 2200 to 0000
			if (endTimeHours == 0 && startTimeHours == 22) {
				endTimeHours = 24;
			} 

			if (date.getHours() < endTimeHours && date.getHours() >= startTimeHours) {
				index = i;
				break;

			}
		}
		return index;
	});
}
// Gets the upcoming rule's stage details
export async function getEmbedScheduleNextRule(msg: Message, title: string, battleType: Battle.Types, rule: Rule.Types): Promise<void> {
	return await getEmbedSchedule(msg, title, battleType, (info: ScheduleInfo[]) => {
		let index = -1;
		let ruleInfo: Rule.Info = Rule.getInfo(rule);
		if (!ruleInfo) {
			return -1;
		}
		for (let i = 0; i < info.length; ++i) {
			if (info[i].rule.key == ruleInfo.key) {
				index = i;
				break;
			}
		}
		return index;
	});
}
// Gets the upcoming stage details
export async function getEmbedScheduleNext(msg: Message, title: string, battleType: Battle.Types): Promise<void> {
	return await getEmbedSchedule(msg, title, battleType, (info: ScheduleInfo[]) => {
		return 1;
	});
}
// Gets the current ongoing stage details
export async function getEmbedScheduleNow(msg: Message, title: string, battleType: Battle.Types): Promise<void> {
	return await getEmbedSchedule(msg, title, battleType, (info: ScheduleInfo[]) => {
		return 0;
	});
}
export async function getEmbedSchedule(msg: Message, title: string, battleType: Battle.Types, scheduleSelectorFunc: (info: ScheduleInfo[]) => number) : Promise<void> {
	let currentMessage: Message = <Message>(await msg.channel.send("（｀・ω・´）Gimme a sec..."));
	try {
		// Call API to get the schedule and locale info
		const localeJp: any = await SplatoonInkApi.getLocaleJp();
		const r: Schedule = await SplatoonInkApi.getSchedule();
		const results: ScheduleInfo[] = getScheduleFuncByBattleType(battleType, r);
		let index: number = scheduleSelectorFunc(results);
		if (index < 0) {
			await currentMessage.edit("(´・ω・`) Sorry, I have no data on that...");
			return;
		}
		const result: ScheduleInfo = results[index];
		const stageAUrl: string = URL_SPLATOON_WIKI + result.stage_a.name.replace(/\s/g, "_");
		const stageBUrl: string = URL_SPLATOON_WIKI + result.stage_b.name.replace(/\s/g, "_");
		const ruleUrl: string = URL_SPLATOON_WIKI + result.rule.name.replace(/\s/g, "_");
		const stageAPath: string = globals.ImgStagesPath + result.stage_a.name + ".jpg";
		const stageBPath: string = globals.ImgStagesPath + result.stage_b.name + ".jpg";
		const battleInfo: Battle.Info = Battle.getInfo(battleType);
		await currentMessage.edit("(｀・ω・´)9  Just a bit more...");
		

		let embed: Rewrap = new Rewrap();
		embed.RichEmbed.setTitle(title);
		embed.RichEmbed.setColor(battleInfo.color);
		(battleInfo.type != Battle.Types.REGULAR) && embed.RichEmbed.addField("Mode:", sprintf("[%s](%s)\n%s\n", result.rule.name, ruleUrl, localeJp["rules"][result.rule.key].name));
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
		await embed.getAuthorWithImg(globals.ImgPath + IMG_AUTHOR, IMG_AUTHOR, NAME_AUTHOR);
		await embed.setThumbnailImg(globals.ImgPath + battleInfo.thumbnailImg, battleInfo.thumbnailImg);
		await embed.setImgMultiple([stageAPath, stageBPath], globals.ImgOutPath + battleInfo.outputImg, battleInfo.outputImg);
		await currentMessage.edit("(;;｀・ω・´)9  Almost...there...");
		await msg.channel.send(embed.finalize());
		await currentMessage.delete();
	}
	catch (e) {
		console.error(e);
		await currentMessage.edit("(´・ω・`) Call Momo...something went wrong...");
	}
}


export async function getEmbedCallout(msg: Message, title: string, mapKey: string): Promise<void>  {
	let info = Map.getMap(mapKey);
	let currentMessage: Message = <Message>(await msg.channel.send("（｀・ω・´）Gimme a sec..."));
	if (info) {
		let embed: Rewrap = new Rewrap();
		embed.RichEmbed.setTitle(title);
		embed.RichEmbed.setColor(0x40f76b);
		embed.RichEmbed.addField("Map Name:", sprintf("%s\n%s", info.enName, info.jpName));

		await embed.getAuthorWithImg(globals.ImgPath + IMG_AUTHOR, IMG_AUTHOR, NAME_AUTHOR);
		await embed.setImg(globals.ImgCalloutPath + info.filename, info.filename);
		await msg.channel.send(embed.finalize());
		await currentMessage.delete();
	}
	else {
		await currentMessage.edit("I can't find the map...(´・ω・`)");
	}
}

export async function getEmbedRandomWeapon(msg: Message, info: Weapon.WeaponInfo): Promise<void>  {
	let embed: Rewrap = new Rewrap();
	let currentMessage: Message = <Message>(await msg.channel.send("（｀・ω・´）Randomizing!"));
	embed.RichEmbed.setTitle("You! Should! Use! This! Weapon!");
	embed.RichEmbed.setColor(0x40f76b);
	embed.RichEmbed.addField("（｀・ω・´）", sprintf("%s", info.enName));

	await embed.getAuthorWithImg(globals.ImgPath + IMG_AUTHOR, IMG_AUTHOR, NAME_AUTHOR);
	await embed.setImg(globals.ImgWeaponPath + info.filename, info.filename);
	await msg.channel.send(embed.finalize());
	await currentMessage.delete();
}

