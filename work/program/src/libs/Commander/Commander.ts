import { CommandBase } from './CommandBase';
import { CommandCallbackParams } from './CommandCallbackParams';
import { readdir } from 'fs';
import { promisify } from 'util';

const readdirAsync = promisify(readdir);

// Invoker class
export class Commander {
	private commandList: Map<string, CommandBase> = new Map<string, CommandBase>();

	public addCommand(commandToAdd: CommandBase): void {
		let command: CommandBase | undefined = this.commandList.get(commandToAdd.name);
		if (!command) {
			this.commandList.set(commandToAdd.name, commandToAdd);
			console.info("[Commander] Added Command: " + commandToAdd.name);
		}
		else {
			throw new Error("Command already exists: " + commandToAdd.name);
		}
	}

	public async exec(name: string, params: CommandCallbackParams): Promise<boolean> {
		let command: CommandBase | undefined = this.commandList.get(name);
		if (command) {
			try {
				await command.exec(params);
			} catch {
				console.error("[Commander] Something went wrong with the command: " + name);
			}

			return true;
		}
		return false;
	}

	public async parseDir(path: string): Promise<void> {
		let files: string[] = await readdirAsync(path);
		for (let i: number = 0; i < files.length; ++i) {
			let filename_split = files[i].split(/\.(.+)/);
			if (filename_split != null) {
				// only accept js files
				if (filename_split[1] == "js") {
					let filename: string = filename_split[0];
					let module: any = await import(`${path}${filename}`);
					this.addCommand(module());
				}
			}
		}		
	}

}