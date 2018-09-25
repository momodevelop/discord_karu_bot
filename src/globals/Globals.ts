//import { cJsonDBBotify } from 'libs/JsonDB/cJsonDBBotify'
import { cSplatoonInkApi } from 'libs/SplatoonInkApi/cSplatoonInkApi'

class cGlobals {
	/*private _jsonDbBotify: cJsonDBBotify = new cJsonDBBotify();

	public get JsonDb(): cJsonDBBotify {
		return this._jsonDbBotify;
	}*/

	private _splatoonInkApi: cSplatoonInkApi = new cSplatoonInkApi();

	public get SplatoonInkApi(): cSplatoonInkApi {
		return this._splatoonInkApi;
	}

	private _root: string;
	public set Root(root: string) {
		this._root = root;
	}
	public get Root(): string {
		return this._root;
	}

	public get ImgPath(): string {
		return this._root + process.env.IMG_PATH;
	}
};

export let Globals: cGlobals = new cGlobals(); 