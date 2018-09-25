// Details here: https://github.com/misenhower/splatoon2.ink/wiki/Data-access-policy

import * as request from 'request-promise-native';
import {
	iSchedule
} from './cSplatoonInkDefines';

export class cSplatoonInkApi {

	public static async getSchedule(): Promise<iSchedule> {
		return this.callDataApi('schedules.json');
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

	public static async callImageApi(path: string): Promise<any> {
		return this.callApi(this.imageUrl + path, { encoding: null });
	}

	public static get baseUrl(): string {
		return "https://splatoon2.ink/";
	}

	public static get dataUrl(): string {
		return this.baseUrl + "data/";
	}

	public static get imageUrl(): string {
		return this.baseUrl + "assets/splatnet/";
	}

}
