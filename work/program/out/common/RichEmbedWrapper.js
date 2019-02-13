"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const common_1 = require("./common");
const promisify_1 = require("./promisify");
const mergeImg = require("merge-img");
class RichEmbedWrapper {
    constructor() {
        this._richEmbedObj = new discord_js_1.RichEmbed();
        this._files = [];
    }
    get RichEmbed() {
        return this._richEmbedObj;
    }
    SetAuthorWithImg(path, name, authorName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.AddAttachment(path, name)) {
                this.RichEmbed.setAuthor(authorName, RichEmbedWrapper.GetAttachmentStr(name));
                return true;
            }
            return false;
        });
    }
    // TODO: reject multiple names when adding files
    AddAttachment(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield common_1.common.file_exists(path)) {
                this._files.push({
                    attachment: path,
                    name: name
                });
                return true;
            }
            return false;
        });
    }
    SetThumbnailImg(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.AddAttachment(path, name)) {
                this.RichEmbed.setThumbnail(RichEmbedWrapper.GetAttachmentStr(name));
                return true;
            }
            return false;
        });
    }
    static GetAttachmentStr(name) {
        return "attachment://" + name;
    }
    SetImg(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.AddAttachment(path, name)) {
                this.RichEmbed.setImage(RichEmbedWrapper.GetAttachmentStr(name));
                return true;
            }
            return false;
        });
    }
    SetImgMultiple(paths, outputPath, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (paths.length <= 1) {
                console.error("SetImgMultiple expects more than 1 paths!");
                return false;
            }
            for (let i = 0; i < paths.length; ++i) {
                let found = yield common_1.common.file_exists(paths[i]);
                if (!found) {
                    console.error("File does not exist: " + paths[i]);
                    return false;
                }
            }
            let img = yield mergeImg(paths);
            yield promisify_1.jimpWriteAsync(img, outputPath);
            if (!(yield this.AddAttachment(outputPath, name))) {
                return false;
            }
            this.RichEmbed.setImage(RichEmbedWrapper.GetAttachmentStr(name));
            return true;
        });
    }
    Finalize() {
        this._richEmbedObj.attachFiles(this._files);
        return this._richEmbedObj;
    }
}
exports.RichEmbedWrapper = RichEmbedWrapper;
//# sourceMappingURL=RichEmbedWrapper.js.map