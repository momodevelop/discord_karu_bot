import { cCommandBase } from './cCommandBase';
import { iCommandList } from './iCommandList';
import { iCommandCallbackParams } from './iCommandCallbackParams';
import { readdir } from 'fs';
import { promisify } from 'util';

const readdirAsync = promisify(readdir);

// Invoker class
export class cCommander {
	private commandList: iCommandList = {};

	public AddCommand(command_to_add: cCommandBase): void {
		if (!this.commandList[command_to_add.name]) {
			this.commandList[command_to_add.name] = command_to_add;
			console.info("[cCommander] Added Command: " + command_to_add.name);
		}
		else {
			throw new Error("Command already exists: " + command_to_add.name);
		}
	}

	public async Exec(name: string, params: iCommandCallbackParams): Promise<boolean> {
		let command: cCommandBase = this.commandList[name];
		if (command) {
			try {
				await command.exec(params);
			} catch {
				console.error("[cCommander] Something went wrong with the command: " + name);
			}

			return true;
		}
		return false;
	}

		public async ParseDir(path: string): Promise<void> {
		let files: string[] = await readdirAsync(path);
		for (let i: number = 0; i < files.length; ++i) {
			let filename_split = files[i].split(/\.(.+)/);
			if (filename_split != null) {
				// only accept js files
				if (filename_split[1] == "js") {
					let filename: string = filename_split[0];
					let module: any = await import(`${path}${filename}`);
					this.AddCommand(module());
				}
			}
		}		
	}

}