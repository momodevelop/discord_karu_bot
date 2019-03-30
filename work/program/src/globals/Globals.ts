//import { cJsonDBBotify } from 'libs/JsonDB/cJsonDBBotify'
import { SplatoonInkApi } from 'libs/SplatoonInkApi/SplatoonInkApi'
import config from 'config.json'

class Globals {
	/*private _jsonDbBotify: cJsonDBBotify = new cJsonDBBotify();

	public get JsonDb(): cJsonDBBotify {
		return this._jsonDbBotify;
	}*/

	private _splatoonInkApi: SplatoonInkApi = new SplatoonInkApi();

	public get SplatoonInkApi(): SplatoonInkApi {
		return this._splatoonInkApi;
	}

	private _root: string = "";
	public set Root(root: string) {
		this._root = root;
	}
	public get Root(): string {
		return this._root;
	}

	public get ImgPath(): string {
		return this._root + config.imgPath;
	}

	public get ImgStagesPath(): string {
		return this._root + config.imgPath + "stages/";
	}

	public get ImgOutPath(): string {
		return this._root + config.imgPath + "out/";
	}
};

export let globals: Globals = new Globals(); 