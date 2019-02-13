"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = [
    "Byeeeeee~!",
    "Noooooooo come back!! Okay...bye...TvT",
];
function rand_msg() {
    let rand = Math.floor(Math.random() * messages.length);
    return messages[rand];
}
exports.rand_msg = rand_msg;
//# sourceMappingURL=MsgArrayBye.js.map