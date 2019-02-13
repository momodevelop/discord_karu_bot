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
// All the common shit
const common_1 = require("common/common");
const RichEmbedWrapper_1 = require("common/RichEmbedWrapper");
const cSplatoonInkApi_1 = require("libs/SplatoonInkApi/cSplatoonInkApi");
const Globals_1 = require("globals/Globals");
const sprintf_js_1 = require("sprintf-js");
var eBattleTypes;
(function (eBattleTypes) {
    eBattleTypes[eBattleTypes["REGULAR"] = 0] = "REGULAR";
    eBattleTypes[eBattleTypes["GACHI"] = 1] = "GACHI";
    eBattleTypes[eBattleTypes["LEAGUE"] = 2] = "LEAGUE";
})(eBattleTypes = exports.eBattleTypes || (exports.eBattleTypes = {}));
var eRuleTypes;
(function (eRuleTypes) {
    eRuleTypes[eRuleTypes["RAINMAKER"] = 0] = "RAINMAKER";
    eRuleTypes[eRuleTypes["CLAM_BLITZ"] = 1] = "CLAM_BLITZ";
    eRuleTypes[eRuleTypes["TOWER_CONTROL"] = 2] = "TOWER_CONTROL";
    eRuleTypes[eRuleTypes["SPLAT_ZONES"] = 3] = "SPLAT_ZONES";
})(eRuleTypes = exports.eRuleTypes || (exports.eRuleTypes = {}));
class SplatoonHelper {
    static GetScheduleFuncByType(type, r) {
        let ret = r.regular;
        switch (type) {
            case eBattleTypes.GACHI:
                ret = r.gachi;
                break;
            case eBattleTypes.LEAGUE:
                ret = r.league;
                break;
        }
        return ret;
    }
    static GetRuleByCondition(content) {
        const f = common_1.common.has_words;
        if (f(content, this.CONDITION_FOR_RULES[eRuleTypes.RAINMAKER])) {
            return eRuleTypes.RAINMAKER;
        }
        else if (f(content, this.CONDITION_FOR_RULES[eRuleTypes.CLAM_BLITZ])) {
            return eRuleTypes.CLAM_BLITZ;
        }
        else if (f(content, this.CONDITION_FOR_RULES[eRuleTypes.SPLAT_ZONES])) {
            return eRuleTypes.SPLAT_ZONES;
        }
        else if (f(content, this.CONDITION_FOR_RULES[eRuleTypes.TOWER_CONTROL])) {
            return eRuleTypes.TOWER_CONTROL;
        }
        return null;
    }
    static ConditionsProc(conditions, content) {
        const f = common_1.common.has_words;
        for (let i = 0; i < conditions.length; ++i) {
            if (!f(content, conditions[i])) {
                return false;
            }
        }
        return true;
    }
    // Gets the stage details by time (using Date)
    static SplatoonTimeProc(params, title, type, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SplatoonHelper.SplatoonMainProc(params, title, type, (info) => {
                let index = -1;
                // assumes that info time is form earliest of latest.
                for (let i = 0; i < info.length; ++i) {
                    let timeDiff = info[i].end_time * 1000 - date.getTime();
                    if (timeDiff > 0) {
                        index = i;
                        break;
                    }
                }
                return index;
            });
        });
    }
    // Gets the upcoming rule's stage details
    static SplatoonNextRuleProc(params, title, type, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SplatoonHelper.SplatoonMainProc(params, title, type, (info) => {
                let index = -1;
                for (let i = 0; i < info.length; ++i) {
                    if (info[i].rule.key == SplatoonHelper.RULES_KEY[rule]) {
                        index = i;
                        break;
                    }
                }
                return index;
            });
        });
    }
    // Gets the upcoming stage details
    static SplatoonNextAnyProc(params, title, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SplatoonHelper.SplatoonMainProc(params, title, type, (info) => {
                return 1;
            });
        });
    }
    // Gets the current ongoing stage details
    static SplatoonNowProc(params, title, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SplatoonHelper.SplatoonMainProc(params, title, type, (info) => {
                return 0;
            });
        });
    }
    static SplatoonMainProc(params, title, type, scheduleSelectorFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentMessage = (yield params.msg.channel.send("（｀・ω・´）Gimme a sec..."));
            // Call API to get the schedule and locale info
            const localeJp = yield cSplatoonInkApi_1.cSplatoonInkApi.getLocaleJp();
            const r = yield cSplatoonInkApi_1.cSplatoonInkApi.getSchedule();
            const results = this.GetScheduleFuncByType(type, r);
            let index = scheduleSelectorFunc(results);
            if (index < 0) {
                yield currentMessage.edit("(´・ω・`) Sorry, I have no data on that...");
                return;
            }
            const result = results[index];
            const stageAUrl = this.URL_SPLATOON_WIKI + result.stage_a.name.replace(/\s/g, "_");
            const stageBUrl = this.URL_SPLATOON_WIKI + result.stage_b.name.replace(/\s/g, "_");
            const ruleUrl = this.URL_SPLATOON_WIKI + result.rule.name.replace(/\s/g, "_");
            const stageAPath = Globals_1.Globals.ImgStagesPath + result.stage_a.name + ".jpg";
            const stageBPath = Globals_1.Globals.ImgStagesPath + result.stage_b.name + ".jpg";
            yield currentMessage.edit("(｀・ω・´)9  Just a bit more...");
            let embed = new RichEmbedWrapper_1.RichEmbedWrapper();
            embed.RichEmbed.setTitle(title);
            embed.RichEmbed.setColor(this.COLOR[type]);
            (type != eBattleTypes.REGULAR) && embed.RichEmbed.addField("Mode:", sprintf_js_1.sprintf("[%s](%s)\n%s\n", result.rule.name, ruleUrl, localeJp["rules"][result.rule.key].name));
            embed.RichEmbed
                .addField("Time: ", sprintf_js_1.sprintf("%s - %s", common_1.common.simplify_time(result.start_time), common_1.common.simplify_time(result.end_time)))
                .addField("Maps:", sprintf_js_1.sprintf("[%s](%s)\n%s\n[%s](%s)\n%s", result.stage_a.name, stageAUrl, localeJp["stages"][result.stage_a.id].name, result.stage_b.name, stageBUrl, localeJp["stages"][result.stage_b.id].name));
            yield embed.SetAuthorWithImg(Globals_1.Globals.ImgPath + this.IMG_AUTHOR, this.IMG_AUTHOR, this.NAME_AUTHOR);
            yield embed.SetThumbnailImg(Globals_1.Globals.ImgPath + this.IMG_THUMBNAIL[type], this.IMG_THUMBNAIL[type]);
            yield embed.SetImgMultiple([stageAPath, stageBPath], Globals_1.Globals.ImgOutPath + this.IMG_OUTPUT_NAME[type], this.IMG_OUTPUT_NAME[type]);
            yield currentMessage.edit("(;;｀・ω・´)9  Almost...there...");
            yield params.msg.channel.send(embed.Finalize());
            yield currentMessage.delete();
        });
    }
}
SplatoonHelper.COLOR = [
    [207, 246, 34],
    [245, 73, 16],
    [240, 45, 125]
];
SplatoonHelper.CONDITION_FOR_RULES = [
    ["rainmaker", "hoko"],
    ["clam blitz", "asari"],
    ["tower", "yagura"],
    ["zones", "zone", "area"],
];
SplatoonHelper.CONDITION_BATTLE_TYPE = [
    ["regular", "turf"],
    ["gachi", "ranked", "rank"],
    ["league"],
];
SplatoonHelper.RULES_KEY = [
    "rainmaker",
    "clam blitz",
    "tower_control",
    "splat_zones"
];
SplatoonHelper.RULES_NAME = [
    "Rainmaker",
    "Clam",
    "Tower Control",
    "Splat Zones"
];
SplatoonHelper.IMG_THUMBNAIL = [
    "regular.png", "gachi.png", "league.png"
];
SplatoonHelper.IMG_OUTPUT_NAME = [
    "out_regular.jpg", "out_gachi.jpg", "out_league.jpg"
];
SplatoonHelper.NAME_AUTHOR = "Karu";
SplatoonHelper.URL_SPLATOON_WIKI = "https://splatoonwiki.org/wiki/";
SplatoonHelper.IMG_AUTHOR = "karu.png";
exports.SplatoonHelper = SplatoonHelper;
//# sourceMappingURL=SplatoonHelper.js.map