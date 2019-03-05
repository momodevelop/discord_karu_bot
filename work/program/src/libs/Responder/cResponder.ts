import { cResponseBase } from './cResponseBase';
import { readdir } from 'fs';
import { iResponseCallbackParams } from './iResponseCallbackParams';

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

	public ParseDir(path: string) {
		readdir(path, (err: NodeJS.ErrnoException, files: string[]) => {
			files.forEach(file => {
				let filename_split = file.split(/\.(.+)/);

				if (filename_split != null) {
					// only accept js files
					if (filename_split[1] == "js") {
						let filename: string = filename_split[0];
						import(`${path}${filename}`).then((module) => {
							this.AddResponse(module(), filename);
						});
					}
				}

			});
		});
}

}