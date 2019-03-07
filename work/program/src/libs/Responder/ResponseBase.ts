import { ResponseCallbackParams } from './ResponseCallbackParams';

export abstract class ResponseBase {
	// To be overwritten
	public async exec(params: ResponseCallbackParams): Promise<boolean> {
		return false;
	}

}


