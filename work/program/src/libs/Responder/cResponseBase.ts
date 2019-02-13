import { iResponseCallbackParams } from './iResponseCallbackParams';

export abstract class cResponseBase {
	// To be overwritten
	public async exec(params: iResponseCallbackParams): Promise<boolean> {
		return false;
	}

}


