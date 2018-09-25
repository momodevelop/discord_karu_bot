import { common } from 'common/common';
import { cResponseBase } from 'libs/Responder/cResponseBase';
import { cCallbackParams } from '../cCallbackParams';
import { rand_msg } from 'messages/MsgArrayThanks'
import { Client, Message, RichEmbed } from 'discord.js';
import { iSchedule, iCompetitiveScheduleInfo } from 'libs/SplatoonInkApi/cSplatoonInkDefines';
import { cSplatoonInkApi } from 'libs/SplatoonInkApi/cSplatoonInkApi';
import { Globals } from 'globals/Globals'
import { sprintf } from 'sprintf-js';
import { writeFileAsync, jimpWriteAsync } from 'common/promisify';
import * as mergeImg from 'merge-img';
import Jimp from 'jimp-custom';

class cResponse extends cResponseBase {

	public async exec(params: cCallbackParams): Promise<boolean> {
		

		let f = common.has_words;
		let c = params.msg.content;
		if (f(c, ["ranked", "gachi"])) {
			params.msg.channel.send("Gimme a sec! （｀・ω・´）");

			let r: iSchedule = await cSplatoonInkApi.getSchedule();
			let result: iCompetitiveScheduleInfo = r.gachi[0];

			// Combine the images /////////////////////////////////////////////
			const imgPath1: string = Globals.ImgPath + 'stages/' + result.stage_a.name + '.png';
			const imgPath2: string = Globals.ImgPath + 'stages/' + result.stage_b.name + '.png';
			const outputFile: string = 'gachi_out.png';
			const outputPath: string = Globals.ImgPath + 'out/' + outputFile;
			const thumbnail: string = 'gachi.png';
			const karuImg: string = 'karu.png';

			// TODO need to check if the images are valid?
			let img: Jimp = await mergeImg([imgPath1, imgPath2]);
			await jimpWriteAsync(img, outputPath);

			const embed: RichEmbed = new RichEmbed()
				.setTitle("GACHI MATCH!!　(ﾉ≧∇≦)ﾉ ﾐ ┸━┸ ")
				.setColor([245, 73, 16])
				.addField("Mode:", sprintf("%s", result.rule.name))
				.addField("Maps:", sprintf("%s\n%s", result.stage_a.name, result.stage_b.name))
				.setThumbnail("attachment://" + thumbnail)
				.setAuthor("Karu", "attachment://" + karuImg)
				.setImage("attachment://" + outputFile);
				
			await params.msg.channel.send({
				embed,
				files: [
					{ attachment: Globals.ImgPath + thumbnail, name: thumbnail },
					{ attachment: Globals.ImgPath + karuImg, name: karuImg },
					{ attachment: outputPath, name: outputFile },
				]
			});

			return true;
		}
		return false;
	}
}

export = function () {
	return new cResponse();
}