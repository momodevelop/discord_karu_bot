import { iCommandCallbackParams } from './iCommandCallbackParams';
import { iCommandList } from './iCommandList';

export abstract class cCommandBase {
	readonly abstract name: string;

	public async exec(params: iCommandCallbackParams): Promise<void> {
		return;
	}


}


