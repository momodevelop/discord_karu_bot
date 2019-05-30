import { hasWords } from 'common/Utils';

export interface MapInfo {
	filename: string;
	enName: string;
	jpName: string;
}

const mapList: Map<string, MapInfo> = new Map<string, MapInfo>();
mapList.set("world", 		{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("warehouse", 	{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("towers", 		{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("skatepark", 	{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("shipyard", 	{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("reef",			{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("pumptrack", 	{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("port", 		{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("pit", 			{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("pavilion", 	{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("mart", 		{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});
mapList.set("manta", 		{filename: "callout/world.png", enName: "Smash World", jpName: "あ"});

export function getMap(key: string): MapInfo | undefined {
    return mapList.get(key);
}

export function getMapKeys() :IterableIterator<string> {
    return mapList.keys();
}