import { RichEmbed } from 'discord.js';
import { fileExists } from './Utils';
import { jimpWriteAsync } from './Promisify';
import mergeImg from 'merge-img';
import Jimp from 'jimp-custom';

interface Files {
	attachment: string;
	name: string;
}

export class RichEmbedWrapper {
	private _richEmbedObj: RichEmbed;
	private _files: Files[];

	constructor() {
		this._richEmbedObj = new RichEmbed();
		this._files = [];
	}

	public get RichEmbed() {
		return this._richEmbedObj;
	}

	public async getAuthorWithImg(path: string, name: string, authorName: string): Promise<boolean> {
		if (await this.addAttachment(path, name)) {
			this.RichEmbed.setAuthor(authorName, RichEmbedWrapper.getAttachmentStr(name));
			return true;
		}
		return false;
		
	}

	// TODO: reject multiple names when adding files
	public async addAttachment(path: string, name: string): Promise<boolean> {
		if (await fileExists(path)) {
			this._files.push({
				attachment: path,
				name: name
			});
			return true;
		}
		return false;
	}

	public async setThumbnailImg(path: string, name: string): Promise<boolean> {
		if (await this.addAttachment(path, name)) {
			this.RichEmbed.setThumbnail(RichEmbedWrapper.getAttachmentStr(name));
			return true;
		}
		return false;
	}

	public static getAttachmentStr(name: string): string {
		return "attachment://" + name;
	}

	public async setImg(path: string, name: string): Promise<boolean> {
		if (await this.addAttachment(path, name)) {
			this.RichEmbed.setImage(RichEmbedWrapper.getAttachmentStr(name));
			return true;
		}
		return false;
	}

	public async setImgMultiple(paths: string[], outputPath: string, name: string): Promise<boolean> {
		if (paths.length <= 1) {
			console.error("setImgMultiple expects more than 1 paths!");
			return false;
		}

		for (let i = 0; i < paths.length; ++i) {
			let found: boolean = await fileExists(paths[i]);
			if (!found) {
				console.error("File does not exist: " + paths[i]);
				return false;
			}
		}

		let img: Jimp = await mergeImg(paths);
		await jimpWriteAsync(img, outputPath);

		if (!await this.addAttachment(outputPath, name)) {
			return false;
		}

		this.RichEmbed.setImage(RichEmbedWrapper.getAttachmentStr(name));
		return true;

	}

	public finalize(): RichEmbed {
		this._richEmbedObj.attachFiles(this._files);
		return this._richEmbedObj;
	}
}

