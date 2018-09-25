export interface iObject {
	[key: string]: string;
}

// combines an array of strings.
export function CombineStrings(args:string[], sperator:string, start?:number, end?:number) : string {
    if (start == null || start < 0) {
        start = 0;
    }
    if ( end == null || end < 0){
        end = args.length;
    }
    let result:string = "";
    for (let i = start; i < end; ++i) {
        result += args[i];
        if ( i != end - 1){
            result += sperator;
        }
    }
    return result;
}

export function DispSelectResultCSV(args: Array<iObject>): string[] {
	let result: string[] = [];
	if (args.length <= 0) {
		return result;
	}

	// get the keys
	let keys: string = "";
	Object.keys(args[0]).forEach(key => {
		keys += key + ",";
	});
	keys = keys.substring(0, keys.length - 1);
	result.push(keys);

	// get the values
	for (let i: number = 0; i < args.length; ++i) {
		let value: string = "";
		Object.keys(args[i]).forEach(key => {
			value += args[i][key] + ",";
		});
		value = value.substring(0, value.length - 1);
		result.push(value);
	}


	return result;
}

export function DispSelectResultEntry(args: Array<iObject>): string[] {
	let result: string[] = [];
	if(args.length <= 0) {
		return result;
	}

	for (let i: number = 0; i <args.length; ++i) {
		let value: string = "";
		Object.keys(args[i]).forEach(key => {
			value += key + ": " + args[i][key] + "\n";
		});
		value = value.substring(0, value.length - 1);
		result.push(value);
	}

	return result;
}
