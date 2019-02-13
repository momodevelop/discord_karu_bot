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
const fs_1 = require("fs");
// Invoker class
class cResponder {
    constructor() {
        this.responseList = [];
    }
    AddResponse(response_to_add, name) {
        this.responseList.push(response_to_add);
        console.info("[cResponder] Added Command: " + name);
    }
    Exec(params) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.responseList.length; ++i) {
                if (yield this.responseList[i].exec(params)) {
                    return true;
                }
            }
            return false;
        });
    }
    ParseDir(path) {
        fs_1.readdir(path, (err, files) => {
            files.forEach(file => {
                let filename_split = file.split(/\.(.+)/);
                if (filename_split != null) {
                    // only accept js files
                    if (filename_split[1] == "js") {
                        let filename = filename_split[0];
                        Promise.resolve().then(function () { return require(`${path}${filename}`); }).then((module) => {
                            this.AddResponse(module(), filename);
                        });
                    }
                }
            });
        });
    }
}
exports.cResponder = cResponder;
//# sourceMappingURL=cResponder.js.map