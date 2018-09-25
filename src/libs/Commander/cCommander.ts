import { cCommandBase } from './cCommandBase';
import { iCommandList } from './iCommandList';
import { iCommandCallbackParams } from './iCommandCallbackParams';
import { readdir } from 'fs';

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

	public GetCommand(name: string, params: iCommandCallbackParams): Promise<void> {
		return this.commandList[name].exe(params)
			.then(() => {
				return Promise.resolve();
			})
			.catch(() => {
				console.error("[cCommander] Something went wrong with the command: " + name);
			});
	}

	public ParseDir(path: string) {
		readdir(path, (err: NodeJS.ErrnoException, files: string[]) => {
			files.forEach(file => {
				let filename_split = file.split(/\.(.+)/);

				if (filename_split != null) {
					// only accept js files
					if (filename_split[1] == "js") {
						let filename: string = filename_split[0];
						import(`${path}${filename}`).then((module) => {
							this.AddCommand(module())
						});
					}
				}

			});
		});
}

}