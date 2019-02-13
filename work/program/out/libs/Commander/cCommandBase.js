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
class cCommandBase {
    constructor() {
        this.subList = {};
    }
    exec(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    exec_subs(command, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.subList[command]) {
                return this.subList[command].exec(params)
                    .then(() => {
                    return Promise.resolve(true);
                });
            }
            return Promise.resolve(false);
        });
    }
    // function for commander to run 
    exe(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let possible_sub_command = params.args[0];
            if (possible_sub_command && this.subList[possible_sub_command]) {
                params.args.shift();
                return this.exec_subs(possible_sub_command, params)
                    .then((r) => {
                    if (r) {
                        return Promise.resolve();
                    }
                    else {
                        return this.exec(params);
                    }
                });
            }
            return this.exec(params);
        });
    }
}
exports.cCommandBase = cCommandBase;
//# sourceMappingURL=cCommandBase.js.map