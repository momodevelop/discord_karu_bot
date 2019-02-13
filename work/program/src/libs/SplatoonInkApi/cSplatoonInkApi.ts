// Details here: https://github.com/misenhower/splatoon2.ink/wiki/Data-access-policy

import * as request from 'request-promise-native';
import {
	iSchedule
} from './cSplatoonInkDefines';

export class cSplatoonInkApi {

	public static async getSchedule(): Promise<iSchedule> {
		return this.callDataApi('schedules.json');
	}

	//https://splatoon2.ink/data/locale/en.json
	public static async getLocaleEn(): Promise<any> {
		return this.callDataApi('/locale/en.json');
	}

	//https://splatoon2.ink/data/locale/ja.json
	public static async getLocaleJp(): Promise<any> {
		return this.callDataApi('locale/ja.json');
	}


	public static async callApi(path: string, options?:any): Promise<any> {
		let fullpath: string = path;
		let baseOption: any = {
			uri: fullpath,
			method: 'GET',
		}
		options = Object.assign(baseOption, options);

		return await request.get(options);
	}

	public static async callDataApi(path: string): Promise<any> {
		return this.callApi(this.dataUrl + path, { json: true });
	}


	public static get baseUrl(): string {
		return "https://splatoon2.ink/";
	}

	public static get dataUrl(): string {
		return this.baseUrl + "data/";
	}


}
