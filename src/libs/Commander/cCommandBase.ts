import { iCommandCallbackParams } from './iCommandCallbackParams';
import { iCommandList } from './iCommandList';

export abstract class cCommandBase {
	readonly abstract name: string;

	public async exec(params: iCommandCallbackParams): Promise<void> {
		return;
	}

	public subList: iCommandList = {};
	public async exec_subs(command: string, params: iCommandCallbackParams): Promise<boolean> {
		if (this.subList[command]) {
			return this.subList[command].exec(params)
				.then(() => {
					return Promise.resolve(true);
				})
		}
		return Promise.resolve(false);
	}

	// function for commander to run 
	public async exe(params: iCommandCallbackParams): Promise<void> {
		let possible_sub_command = params.args[0];
		if (possible_sub_command && this.subList[possible_sub_command]) {
			params.args.shift();
			return this.exec_subs(possible_sub_command, params)
				.then((r: boolean) => {
					if (r) {
						return Promise.resolve();
					}
					else {
						return this.exec(params);
					}
				})
		}

		return this.exec(params);
	}
}


