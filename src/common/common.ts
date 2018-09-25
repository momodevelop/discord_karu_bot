export namespace common {
	export const DISCORD_MESSAGE_LIMIT = 2000;

	// combines an array of strings.
	export function combine_strings(args: string[], sperator: string, start?: number, end?: number): string {
		if (start == null) {
			start = 0;
		}
		if (end == null) {
			end = args.length;
		}
		let result: string = "";
		for (let i = start; i < end; ++i) {
			result += args[i];
			if (i != end - 1) {
				result += sperator;
			}
		}
		return result;
	}

	export function has_words(str: string, words: string[]) {
		for (let i = 0; i < words.length; ++i) {
			if (str.match(new RegExp("\\b" + words[i] + "\\b")) !== null) {
				return true;
			}
		}
		return false;
	}


}
