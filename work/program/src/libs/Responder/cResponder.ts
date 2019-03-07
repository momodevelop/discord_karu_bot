import { cResponseBase } from './cResponseBase';
import { iResponseCallbackParams } from './iResponseCallbackParams';
import { readdir } from 'fs';
import { promisify } from 'util';

const readdirAsync = promisify(readdir);

// Invoker class
export class cResponder {
	private responseList: cResponseBase[] = [];

	public AddResponse(response_to_add: cResponseBase, name: string): void {
		this.responseList.push(response_to_add);
		console.info("[cResponder] Added Response: " + name);
	}

	public async Exec(params: iResponseCallbackParams): Promise<boolean> {
		for (let i = 0; i < this.responseList.length; ++i) {
			if (await this.responseList[i].exec(params)) {
				return true;
			}
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
					this.AddResponse(module(), filename);
				}
			}
		}
	}

}