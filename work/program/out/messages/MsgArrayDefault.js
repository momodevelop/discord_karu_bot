"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = [
    "Huh?",
    "What?",
    "Eh?",
    "Huh?",
    "Wait, what?",
    "Nani?",
];
function rand_msg() {
    let rand = Math.floor(Math.random() * messages.length);
    return messages[rand];
}
exports.rand_msg = rand_msg;
//# sourceMappingURL=MsgArrayDefault.js.map