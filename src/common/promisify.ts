import { promisify } from 'util';
import { writeFile } from 'fs';
import Jimp from "jimp-custom";

export const writeFileAsync = promisify(writeFile);
export const jimpWriteAsync = function (jimpObj: Jimp, outputPath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		jimpObj.write(outputPath, () => {
			resolve();
		});
	});
}

//export const jimpWriteAsync = promisify(Jimp.write);