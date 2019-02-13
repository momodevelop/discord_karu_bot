"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = [
    "I'm sorry T_T"
];
function rand_msg() {
    let rand = Math.floor(Math.random() * messages.length);
    return messages[rand];
}
exports.rand_msg = rand_msg;
//# sourceMappingURL=MsgArraySorry.js.map