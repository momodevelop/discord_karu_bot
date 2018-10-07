import { RichEmbed } from 'discord.js';
import { common } from 'common/common';
import { writeFileAsync, jimpWriteAsync } from 'common/promisify';
import * as mergeImg from 'merge-img';
import Jimp from 'jimp-custom';

interface iFiles {
	attachment: string;
	name: string;
}

export class RichEmbedWrapper {
	private _richEmbedObj: RichEmbed;
	private _files: iFiles[];

	constructor() {
		this._richEmbedObj = new RichEmbed();
		this._files = [];
	}

	public get RichEmbed() {
		return this._richEmbedObj;
	}

	public async SetAuthorWithImg(path: string, name: string, authorName: string): Promise<boolean> {
		if (await this.AddAttachment(path, name)) {
			this.RichEmbed.setAuthor(authorName, RichEmbedWrapper.GetAttachmentStr(name));
			return true;
		}
		return false;
		
	}

	// TODO: reject multiple names when adding files
	public async AddAttachment(path: string, name: string): Promise<boolean> {
		if (await common.file_exists(path)) {
			this._files.push({
				attachment: path,
				name: name
			});
			return true;
		}
		return false;
	}

	public async SetThumbnailImg(path: string, name: string): Promise<boolean> {
		if (await this.AddAttachment(path, name)) {
			this.RichEmbed.setThumbnail(RichEmbedWrapper.GetAttachmentStr(name));
			return true;
		}
		return false;
	}

	public static GetAttachmentStr(name: string): string {
		return "attachment://" + name;
	}

	public async SetImg(path: string, name: string): Promise<boolean> {
		if (await this.AddAttachment(path, name)) {
			this.RichEmbed.setImage(RichEmbedWrapper.GetAttachmentStr(name));
			return true;
		}
		return false;
	}

	public async SetImgMultiple(paths: string[], outputPath: string, name: string): Promise<boolean> {
		if (paths.length <= 1) {
			console.error("SetImgMultiple expects more than 1 paths!");
			return false;
		}

		for (let i = 0; i < paths.length; ++i) {
			let found: boolean = await common.file_exists(paths[i]);
			if (!found) {
				console.error("File does not exist: " + paths[i]);
				return false;
			}
		}

		let img: Jimp = await mergeImg(paths);
		await jimpWriteAsync(img, outputPath);

		if (!await this.AddAttachment(outputPath, name)) {
			return false;
		}

		this.RichEmbed.setImage(RichEmbedWrapper.GetAttachmentStr(name));
		return true;

	}

	public Finalize(): RichEmbed {
		this._richEmbedObj.attachFiles(this._files);
		return this._richEmbedObj;
	}
}

