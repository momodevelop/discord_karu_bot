"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { cJsonDBBotify } from 'libs/JsonDB/cJsonDBBotify'
const cSplatoonInkApi_1 = require("libs/SplatoonInkApi/cSplatoonInkApi");
class cGlobals {
    constructor() {
        /*private _jsonDbBotify: cJsonDBBotify = new cJsonDBBotify();
    
        public get JsonDb(): cJsonDBBotify {
            return this._jsonDbBotify;
        }*/
        this._splatoonInkApi = new cSplatoonInkApi_1.cSplatoonInkApi();
    }
    get SplatoonInkApi() {
        return this._splatoonInkApi;
    }
    set Root(root) {
        this._root = root;
    }
    get Root() {
        return this._root;
    }
    get ImgPath() {
        return this._root + process.env.IMG_PATH;
    }
    get ImgStagesPath() {
        return this._root + process.env.IMG_PATH + "stages/";
    }
    get ImgOutPath() {
        return this._root + process.env.IMG_PATH + "out/";
    }
}
;
exports.Globals = new cGlobals();
//# sourceMappingURL=Globals.js.map