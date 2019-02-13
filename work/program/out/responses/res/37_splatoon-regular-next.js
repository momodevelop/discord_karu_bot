"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SplatoonHelper_1 = require("responses/common/SplatoonHelper");
const cResponseBase_1 = require("libs/Responder/cResponseBase");
class cResponse extends cResponseBase_1.cResponseBase {
    constructor() {
        super(...arguments);
        this.battleType = SplatoonHelper_1.eBattleTypes.REGULAR;
        this.conditions = [
            SplatoonHelper_1.SplatoonHelper.CONDITION_BATTLE_TYPE[this.battleType],
            ["next"],
        ];
    }
    exec(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!SplatoonHelper_1.SplatoonHelper.ConditionsProc(this.conditions, params.msg.content)) {
                return false;
            }
            // Check for rule types
            let title = "(ﾉ≧∇≦)ﾉ ﾐ The next Turf Wars is...!";
            yield SplatoonHelper_1.SplatoonHelper.SplatoonNextAnyProc(params, title, this.battleType);
            return true;
        });
    }
}
module.exports = function () {
    return new cResponse();
};
//# sourceMappingURL=37_splatoon-regular-next.js.map