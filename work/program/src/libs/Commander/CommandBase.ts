import { CommandCallbackParams } from './CommandCallbackParams';

export abstract class CommandBase {
	readonly abstract name: string;

	public async exec(params: CommandCallbackParams): Promise<void> {
		return;
	}


}


