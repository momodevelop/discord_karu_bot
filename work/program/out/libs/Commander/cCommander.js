"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// Invoker class
class cCommander {
    constructor() {
        this.commandList = {};
    }
    AddCommand(command_to_add) {
        if (!this.commandList[command_to_add.name]) {
            this.commandList[command_to_add.name] = command_to_add;
            console.info("[cCommander] Added Command: " + command_to_add.name);
        }
        else {
            throw new Error("Command already exists: " + command_to_add.name);
        }
    }
    GetCommand(name, params) {
        return this.commandList[name].exe(params)
            .then(() => {
            return Promise.resolve();
        })
            .catch(() => {
            console.error("[cCommander] Something went wrong with the command: " + name);
        });
    }
    ParseDir(path) {
        fs_1.readdir(path, (err, files) => {
            files.forEach(file => {
                let filename_split = file.split(/\.(.+)/);
                if (filename_split != null) {
                    // only accept js files
                    if (filename_split[1] == "js") {
                        let filename = filename_split[0];
                        Promise.resolve().then(function () { return require(`${path}${filename}`); }).then((module) => {
                            this.AddCommand(module());
                        });
                    }
                }
            });
        });
    }
}
exports.cCommander = cCommander;
//# sourceMappingURL=cCommander.js.map