"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = [
    "Hey yo!! XD",
    "Wazzzzzzup! XD",
    "Hey!!!!! ^^/",
    "Yo yo yoz!",
];
function rand_msg() {
    let rand = Math.floor(Math.random() * messages.length);
    return messages[rand];
}
exports.rand_msg = rand_msg;
//# sourceMappingURL=MsgArrayHi.js.map