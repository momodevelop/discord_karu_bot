export interface MapInfo {
	filename: string;
	enName: string;
	jpName: string;
}

const mapList: Map<string, MapInfo> = new Map<string, MapInfo>();
mapList.set("reef", 		{filename: "reef.png", 			enName: "The Reef", 			jpName: "あ"});
mapList.set("fitness", 		{filename: "fitness.png",		enName: "Musselforge Fitness", 	jpName: "あ"});
mapList.set("mainstage",	{filename: "mainstage.png", 	enName: "Starfish MainStage", 	jpName: "あ"});
mapList.set("humpback", 	{filename: "humpback.png", 		enName: "Humpback Pump Track", 	jpName: "あ"});
mapList.set("academy", 		{filename: "academy.png", 		enName: "Inkblot Art Academy", 	jpName: "あ"});
mapList.set("shipyard",		{filename: "shipyard.png", 		enName: "Sturgeon Shipyard", 	jpName: "あ"});
mapList.set("towers", 		{filename: "tower.png", 		enName: "Moray Towers", 		jpName: "あ"});
mapList.set("port", 		{filename: "port.png", 			enName: "Port Mackerel", 		jpName: "あ"});
mapList.set("manta",		{filename: "manta.png", 		enName: "Manta Maria", 			jpName: "あ"});
mapList.set("dome", 		{filename: "dome.png",			enName: "Kelp Dome", 			jpName: "あ"});
mapList.set("canal", 		{filename: "canal.png", 		enName: "Snapper Canal", jpName: "あ"});
mapList.set("skatepark",	{filename: "skatepark.png", 	enName: "Blackbelly Skatepark", jpName: "あ"});
mapList.set("mart",			{filename: "mart.png", 			enName: "MakoMart", jpName: "あ"});
mapList.set("pumptrack", 	{filename: "pumptrack.png", 	enName: "Walleye Warehouse", jpName: "あ"});
mapList.set("institute", 	{filename: "institute.png", 	enName: "Shellendorf Institute", jpName: "あ"});
mapList.set("mall", 		{filename: "mall.png", 			enName: "Arowana Mall", jpName: "あ"});
mapList.set("arena", 		{filename: "arena.png",			enName: "Goby Arena", jpName: "あ"});
mapList.set("pit", 			{filename: "pit.png", 			enName: "Piranha Pit", jpName: "あ"});
mapList.set("camp", 		{filename: "camp.png",	 		enName: "Camp Triggerfish", jpName: "あ"});
mapList.set("world", 		{filename: "world.png",			enName: "Wahoo World", jpName: "あ"});
mapList.set("hotel", 		{filename: "hotel.png", 		enName: "New Albacore Hotel", jpName: "あ"});
mapList.set("games", 		{filename: "game.png", 			enName: "Ancho-V Games", jpName: "あ"});
mapList.set("pavilion", 	{filename: "pavilion.png",		enName: "Skipper Pavilion", jpName: "あ"});

export function getMap(key: string): MapInfo | undefined {
    return mapList.get(key);
}

export function getMapKeys() :IterableIterator<string> {
    return mapList.keys();
}