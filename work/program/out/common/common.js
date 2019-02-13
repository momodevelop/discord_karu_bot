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
const promisify_1 = require("common/promisify");
var common;
(function (common) {
    common.DISCORD_MESSAGE_LIMIT = 2000;
    // combines an array of strings.
    function combine_strings(args, sperator, start, end) {
        if (start == null) {
            start = 0;
        }
        if (end == null) {
            end = args.length;
        }
        let result = "";
        for (let i = start; i < end; ++i) {
            result += args[i];
            if (i != end - 1) {
                result += sperator;
            }
        }
        return result;
    }
    common.combine_strings = combine_strings;
    function has_words(str, words, ignore_case = true) {
        let ignore_case_str = (ignore_case ? "i" : "");
        for (let i = 0; i < words.length; ++i) {
            if (str.match(new RegExp("\\b" + words[i] + "\\b", ignore_case_str)) !== null) {
                return true;
            }
        }
        return false;
    }
    common.has_words = has_words;
    function file_exists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield promisify_1.statFileAsync(path);
            return r.isFile();
        });
    }
    common.file_exists = file_exists;
    // https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
    function parseTime(timeString) {
        if (timeString == '')
            return null;
        // [1] = 1 or 2 digits
        // ignore ':'
        // [2] two numbers
        // [3] p?
        let time = timeString.match(/(\d{1,2}):?(\d\d)?\s*(p?)/i);
        if (time == null)
            return null;
        let hours = parseInt(time[1], 10);
        let minutes = parseInt(time[2], 10) || 0;
        let pm = time[3] != null && time[3].length > 0;
        if (hours < 12 && pm) {
            hours += 12;
        }
        var d = new Date();
        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(0, 0);
        return d;
    }
    common.parseTime = parseTime;
    function simplify_time(time) {
        let d = new Date(time * 1000);
        let hours = d.getHours();
        let ret;
        if (hours >= 12) {
            hours -= 12;
            ret = hours.toString() + "PM";
        }
        else {
            ret = hours.toString() + "AM";
        }
        return ret;
    }
    common.simplify_time = simplify_time;
})(common = exports.common || (exports.common = {}));
//# sourceMappingURL=common.js.map