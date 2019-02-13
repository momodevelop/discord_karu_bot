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
const SplatoonHelper_1 = require("responses/common/SplatoonHelper");
const cResponseBase_1 = require("libs/Responder/cResponseBase");
const sprintf_js_1 = require("sprintf-js");
// Given a specific time, give the map.
// case 1: karu gachi 10am/pm
class cResponse extends cResponseBase_1.cResponseBase {
    constructor() {
        super(...arguments);
        this.battleType = SplatoonHelper_1.eBattleTypes.GACHI;
        this.conditions = [
            SplatoonHelper_1.SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
        ];
    }
    exec(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!SplatoonHelper_1.SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
                return false;
            }
            let date = common_1.common.parseTime(params.msg.content);
            if (date == null) {
                return false;
            }
            let title = sprintf_js_1.sprintf("(ﾉ≧∇≦)ﾉ ﾐ The Ranked Battle at the %02d%02dhrs is...!", date.getHours(), date.getMinutes());
            yield SplatoonHelper_1.SplatoonHelper.SplatoonTimeProc(params, title, this.battleType, date);
            return true;
        });
    }
}
module.exports = function () {
    return new cResponse();
};
//# sourceMappingURL=15_splatoon-gachi-time.js.map