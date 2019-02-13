"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
exports.statFileAsync = util_1.promisify(fs_1.stat);
exports.writeFileAsync = util_1.promisify(fs_1.writeFile);
exports.jimpWriteAsync = function (jimpObj, outputPath) {
    return new Promise((resolve, reject) => {
        jimpObj.write(outputPath, () => {
            resolve();
        });
    });
};
//export const jimpWriteAsync = promisify(Jimp.write); 
//# sourceMappingURL=promisify.js.map