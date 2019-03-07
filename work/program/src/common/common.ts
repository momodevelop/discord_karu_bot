import { statFileAsync } from 'common/promisify';
import { Stats } from 'fs';

export const DISCORD_MESSAGE_LIMIT = 2000;

// combines an array of strings.
export function combineStrings(args: string[], sperator: string, start?: number, end?: number): string {
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

export function hasWords(str: string, words: string[], ignore_case: boolean = true) {
	let ignore_case_str: string = (ignore_case ? "i" : "");
	for (let i = 0; i < words.length; ++i) {
		if (str.match(new RegExp("\\b" + words[i] + "\\b", ignore_case_str)) !== null) {
			return true;
		}
	}
	return false;
}

export async function fileExists(path: string): Promise<boolean> {
	let r: Stats = await statFileAsync(path);
	return r.isFile();
}

// https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
export function parseTime(timeString: string): Date | null {
	if (timeString == '')
		return null;

	// [1] = 1 or 2 digits
	// ignore ':'
	// [2] two numbers
	// [3] p?
	let time: RegExpMatchArray | null = timeString.match(/(\d{1,2}):?(\d\d)?\s*(p?)/i);
	if (time == null)
		return null;

	let hours: number = parseInt(time[1], 10);
	let minutes: number = parseInt(time[2], 10) || 0;
	let pm: boolean = time[3] != null && time[3].length > 0;
	if (hours < 12 && pm) {
		hours += 12;
	}
	var d = new Date();
	d.setHours(hours);
	d.setMinutes(minutes);
	d.setSeconds(0, 0);
	return d;
}

export function simplifyTime(time: number): string {
	let d: Date = new Date(time * 1000);
	let hours: number = d.getHours();
	let ret: string;
	if (hours >= 12) {
		hours -= 12;
		ret = hours.toString() + "PM";
	}
	else {
		ret = hours.toString() + "AM";
	}



	return ret;
}

