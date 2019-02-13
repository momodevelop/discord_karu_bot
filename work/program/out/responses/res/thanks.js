"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const common_1 = require("common/common");
const cResponseBase_1 = require("libs/Responder/cResponseBase");
const MsgArrayThanks_1 = require("messages/MsgArrayThanks");
class cResponse extends cResponseBase_1.cResponseBase {
    exec(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let f = common_1.common.has_words;
            let c = params.msg.content;
            if (f(c, ["thank you", "thanks", "thx"]) && !f(c, ["no"])) {
                params.msg.channel.send(MsgArrayThanks_1.rand_msg());
                return true;
            }
            return false;
        });
    }
}
module.exports = function () {
    return new cResponse();
};
//# sourceMappingURL=thanks.js.map