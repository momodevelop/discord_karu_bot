"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = [
    "You're welcome!",
    "Ah, it's not a bother ^^",
    "Only here to help!　（｀・ω・´）",
];
function rand_msg() {
    let rand = Math.floor(Math.random() * messages.length);
    return messages[rand];
}
exports.rand_msg = rand_msg;
//# sourceMappingURL=MsgArrayThanks.js.map