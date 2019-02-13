"use strict";
// Details here: https://github.com/misenhower/splatoon2.ink/wiki/Data-access-policy
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
class cSplatoonInkApi {
    static getSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.callDataApi('schedules.json');
        });
    }
    //https://splatoon2.ink/data/locale/en.json
    static getLocaleEn() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.callDataApi('/locale/en.json');
        });
    }
    //https://splatoon2.ink/data/locale/ja.json
    static getLocaleJp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.callDataApi('locale/ja.json');
        });
    }
    static callApi(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let fullpath = path;
            let baseOption = {
                uri: fullpath,
                method: 'GET',
            };
            options = Object.assign(baseOption, options);
            return yield request.get(options);
        });
    }
    static callDataApi(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.callApi(this.dataUrl + path, { json: true });
        });
    }
    static get baseUrl() {
        return "https://splatoon2.ink/";
    }
    static get dataUrl() {
        return this.baseUrl + "data/";
    }
}
exports.cSplatoonInkApi = cSplatoonInkApi;
//# sourceMappingURL=cSplatoonInkApi.js.map