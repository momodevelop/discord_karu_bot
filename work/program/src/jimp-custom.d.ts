// This is actually actually a JIMP object. As of 20180924, their definition is a mess so I didn't deal with it

type ImageCallback<U = any> = (
	this: Jimp,
	err: Error | null,
	value: Jimp,
	coords: {
		x: number;
		y: number;
	}
) => U;

declare class Jimp {
	write(path: string, cb?: ImageCallback): this;
}
export default Jimp;
