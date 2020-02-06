export interface MapInfo {
	filename: string;
	enName: string;
	jpName: string;
}

const mapList: Map<string, MapInfo> = new Map<string, MapInfo>();
mapList.set("reef", 		{filename: "reef.png", 			enName: "The Reef", 				jpName: "バッテラストリート"});
mapList.set("fitness", 		{filename: "fitness.png",		enName: "Musselforge Fitness", 		jpName: "フジツボスポーツクラブ"});
mapList.set("mainstage",	{filename: "mainstage.png", 	enName: "Starfish MainStage", 		jpName: "ガンガゼ野外音楽堂"});
mapList.set("humpback", 	{filename: "humpback.png", 		enName: "Humpback Pump Track", 		jpName: "コンブトラック"});
mapList.set("academy", 		{filename: "academy.png", 		enName: "Inkblot Art Academy", 		jpName: "海女美術大学"});
mapList.set("shipyard",		{filename: "shipyard.png", 		enName: "Sturgeon Shipyard", 		jpName: "チョウザメ造船"});
mapList.set("towers", 		{filename: "towers.png", 		enName: "Moray Towers", 			jpName: "タチウオパーキング"});
mapList.set("port", 		{filename: "port.png", 			enName: "Port Mackerel", 			jpName: "ホッケふ頭"});
mapList.set("manta",		{filename: "manta.png", 		enName: "Manta Maria", 				jpName: "マンタマリア号"});
mapList.set("dome", 		{filename: "dome.png",			enName: "Kelp Dome", 				jpName: "モズク農園"});
mapList.set("canal", 		{filename: "canal.png", 		enName: "Snapper Canal", 			jpName: "エンガワ河川敷"});
mapList.set("skatepark",	{filename: "skatepark.png", 	enName: "Blackbelly Skatepark", 	jpName: "Bバスパーク"});
mapList.set("mart",			{filename: "mart.png", 			enName: "MakoMart", 				jpName: "ザトウマーケット"});
mapList.set("pumptrack", 	{filename: "pumptrack.png", 	enName: "Walleye Warehouse", 		jpName: "ハコフグ倉庫"});
mapList.set("institute", 	{filename: "institute.png", 	enName: "Shellendorf Institute", 	jpName: "デボン海洋博物館"});
mapList.set("mall", 		{filename: "mall.png", 			enName: "Arowana Mall", 			jpName: "アロワナモール"});
mapList.set("arena", 		{filename: "arena.png",			enName: "Goby Arena", 				jpName: "アジフライスタジアム"});
mapList.set("pit", 			{filename: "pit.png", 			enName: "Piranha Pit", 				jpName: "ショッツル鉱山"});
mapList.set("camp", 		{filename: "camp.png",	 		enName: "Camp Triggerfish", 		jpName: "モンガラキャンプ場"});
mapList.set("world", 		{filename: "world.png",			enName: "Wahoo World", 				jpName: "スメーシーワールド"});
mapList.set("hotel", 		{filename: "hotel.png", 		enName: "New Albacore Hotel", 		jpName: "ホテルニューオートロ"});
mapList.set("games", 		{filename: "game.png", 			enName: "Ancho-V Games", 			jpName: "アンチョビットゲームズ"});
mapList.set("pavilion", 	{filename: "pavilion.png",		enName: "Skipper Pavilion", 		jpName: "ムツゴ楼"});

export function getMap(key: string): MapInfo | undefined {
    return mapList.get(key);
}

export function getMapKeys() :IterableIterator<string> {
    return mapList.keys();
}