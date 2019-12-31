export interface WeaponInfo {
	filename: string;
	enName: string;
	jpName: string;
}

const weaponList: Map<string, WeaponInfo> = new Map<string, WeaponInfo>();
weaponList.set(".52 Gal", 		                {filename: "90px-S2_Weapon_Main_.52_Gal.png", 		        enName: ".52 Gal", 				    jpName: ""});
weaponList.set(".52 Gal Deco",                 {filename: "90px-S2_Weapon_Main_.52_Gal_Deco.png",	        enName: ".52 Gal Deco", 		jpName: ""});
weaponList.set(".96 Gal",	                    {filename: "90px-S2_Weapon_Main_.96_Gal.png", 	            enName: ".96 Gal", 		jpName: ""});
weaponList.set(".96 Gal Deco",                 {filename: "90px-S2_Weapon_Main_.96_Gal_Deco.png", 		    enName: ".96 Gal Deco", 		jpName: ""});
weaponList.set("Aerospray MG", 	            {filename: "90px-S2_Weapon_Main_Aerospray_MG.png", 		    enName: "Aerospray MG", 		jpName: ""});
weaponList.set("Aerospray PG",		            {filename: "90px-S2_Weapon_Main_Aerospray_PG.png", 		    enName: "Aerospray PG", 		jpName: ""});
weaponList.set("Aerospray RG", 		        {filename: "90px-S2_Weapon_Main_Aerospray_RG.png", 		    enName: "Aerospray RG", 			jpName: ""});
weaponList.set("Ballpoint Splatling", 		    {filename: "90px-S2_Weapon_Main_Ballpoint_Splatling.png", 	enName: "Ballpoint Splatling", 			jpName: ""});
weaponList.set("Ballpoint Splatling Nouveau",	{filename: "90px-S2_Weapon_Main_Ballpoint_Splatling_Nouveau.png", 		enName: "Ballpoint Splatling Nouveau", 				jpName: ""});
weaponList.set("Bamboozler 14 Mk I", 		    {filename: "90px-S2_Weapon_Main_Bamboozler_14_Mk_I.png",	enName: "Bamboozler 14 Mk I", 				jpName: ""});
weaponList.set("Bamboozler 14 Mk II", 		    {filename: "90px-S2_Weapon_Main_Bamboozler_14_Mk_II.png",   enName: "Bamboozler 14 Mk II", 			jpName: ""});
weaponList.set("Bamboozler 14 Mk III",	        {filename: "90px-S2_Weapon_Main_Bamboozler_14_Mk_III.png", 	enName: "Bamboozler 14 Mk III", 	jpName: ""});
weaponList.set("Blaster",			            {filename: "90px-S2_Weapon_Main_Blaster.png", 			enName: "Blaster", 				jpName: ""});
weaponList.set("Bloblobber",   	            {filename: "90px-S2_Weapon_Main_Bloblobber.png", 	enName: "Bloblobber", 		jpName: ""});
weaponList.set("Bloblobber Deco", 	            {filename: "90px-S2_Weapon_Main_Bloblobber_Deco.png", 	enName: "Bloblobber Deco", 	jpName: ""});
weaponList.set("Carbon Roller", 		{filename: "90px-S2_Weapon_Main_Carbon_Roller.png", 			enName: "Carbon Roller", 			jpName: ""});
weaponList.set("Carbon Roller Deco", 		{filename: "90px-S2_Weapon_Main_Carbon_Roller_Deco.png",			enName: "Carbon Roller Deco", 				jpName: ""});
weaponList.set("Cherry H-3 Nozzlenose", 			{filename: "90px-S2_Weapon_Main_Cherry_H-3_Nozzlenose.png", 			enName: "H-3 Nozzlenose", 				jpName: ""});
weaponList.set("Clash Blaster", 		{filename: "90px-S2_Weapon_Main_Clash_Blaster.png",	 		enName: "Clash Blaster", 		jpName: ""});
weaponList.set("Clash Blaster Neo", 		{filename: "90px-S2_Weapon_Main_Clash_Blaster_Neo.png",			enName: "Clash Blaster Neo", 				jpName: ""});
weaponList.set("Classic Squiffer", 		{filename: "90px-S2_Weapon_Main_Classic_Squiffer.png", 		enName: "Classic Squiffer", 		jpName: ""});
weaponList.set("Dapple Dualies", 		{filename: "90px-S2_Weapon_Main_Clear_Dapple_Dualies.png", 			enName: "Dapple Dualies", 			jpName: ""});
weaponList.set("Custom Dualie Squelchers", 	{filename: "90px-S2_Weapon_Main_Custom_Dualie_Squelchers",		enName: "Custom Dualie Squelchers", 		jpName: ""});
weaponList.set("Custom Blaster", 	{filename: "90px-S2_Weapon_Main_Custom_Blaster.png",		enName: "Custom Blaster", 		jpName: ""});
weaponList.set("Custom E-liter 4K", 	{filename: "90px-S2_Weapon_Main_Custom_E-liter_4K.png",		enName: "Custom E-liter 4K", 		jpName: ""});
weaponList.set("Custom E-liter 4K Scope", 	{filename: "90px-S2_Weapon_Main_Custom_E-liter_4K_Scope.png",		enName: "Custom E-liter 4K Scope", 		jpName: ""});
weaponList.set("Custom Explosher", 	{filename: "90px-S2_Weapon_Main_Custom_Explosher.png",		enName: "Custom Explosher", 		jpName: ""});
weaponList.set("Custom Goo Tuber", 	{filename: "90px-S2_Weapon_Main_Custom_Goo_Tuber.png",		enName: "Custom Goo Tuber", 		jpName: ""});
weaponList.set("Custom Hydra Splatling", 	{filename: "90px-S2_Weapon_Main_Custom_Hydra_Splatling.png",		enName: "Custom Hydra Splatling", 		jpName: ""});
weaponList.set("Custom Jet Squelcher", 	{filename: "90px-S2_Weapon_Main_Custom_Jet_Squelcher.png",		enName: "Custom Jet Squelcher", 		jpName: ""});
weaponList.set("Custom Range Blaster", 	{filename: "90px-S2_Weapon_Main_Custom_Range_Blaster.png",		enName: "Custom Range Blaster", 		jpName: ""});
weaponList.set("Custom Splattershot Jr.", 	{filename: "90px-S2_Weapon_Main_Custom_Splattershot_Jr..png",		enName: "Custom Splattershot Jr.", 		jpName: ""});
weaponList.set("Dapple Dualies", 	{filename: "90px-S2_Weapon_Main_Dapple_Dualies.png",		enName: "Dapple Dualies", 		jpName: ""});
weaponList.set("Dapple Dualies Nouveau", 	{filename: "90px-S2_Weapon_Main_Dapple_Dualies_Nouveau.png",		enName: "Dapple Dualies Nouveau", 		jpName: ""});
weaponList.set("Dark Tetra Dualies", 	{filename: "90px-S2_Weapon_Main_Dark_Tetra_Dualies.png",		enName: "Dark Tetra Dualies", 		jpName: ""});
weaponList.set("Dualie Squelchers", 	{filename: "90px-S2_Weapon_Main_Dualie_Squelchers.png",		enName: "Dualie Squelchers", 		jpName: ""});
weaponList.set("Dynamo Roller", 	{filename: "90px-S2_Weapon_Main_Dynamo_Roller.png",		enName: "Dynamo Roller", 		jpName: ""});
weaponList.set("E-liter 4K", 	{filename: "90px-S2_Weapon_Main_E-liter_4K.png",		enName: "E-liter 4K", 		jpName: ""});
weaponList.set("E-liter 4K Scope", 	{filename: "90px-S2_Weapon_Main_E-liter_4K_Scope.png",		enName: "E-liter 4K Scope", 		jpName: ""});
weaponList.set("Enperry Splat Dualies", 	{filename: "90px-S2_Weapon_Main_Enperry_Splat_Dualies.png",		enName: "Enperry Splat Dualies", 		jpName: ""});
weaponList.set("Explosher", 	{filename: "90px-S2_Weapon_Main_Explosher.png",		enName: "Explosher", 		jpName: ""});
weaponList.set("Firefin Splat Charger", 	{filename: "90px-S2_Weapon_Main_Firefin_Splat_Charger.png",		enName: "Firefin Splat Charger", 		jpName: ""});
weaponList.set("Firefin Splatterscope", 	{filename: "90px-S2_Weapon_Main_Firefin_Splatterscope.png",		enName: "Firefin Splatterscope", 		jpName: ""});
weaponList.set("Flingza Roller", 	{filename: "90px-S2_Weapon_Main_Flingza_Roller.png",		enName: "Flingza Roller", 		jpName: ""});
weaponList.set("Foil Flingza Roller", 	{filename: "90px-S2_Weapon_Main_Foil_Flingza_Roller.png",		enName: "Foil Flingza Roller", 		jpName: ""});
weaponList.set("Foil Squeezer", 	{filename: "90px-S2_Weapon_Main_Foil_Squeezer.png",		enName: "Foil Squeezer", 		jpName: ""});
weaponList.set("Forge Splattershot Pro", 	{filename: "90px-S2_Weapon_Main_Forge_Splattershot_Pro.png",		enName: "Forge Splattershot Pro", 		jpName: ""});
weaponList.set("Fresh Squiffer", 	{filename: "90px-S2_Weapon_Main_Fresh_Squiffer.png",		enName: "Fresh Squiffer", 		jpName: ""});
weaponList.set("Glooga Dualies", 	{filename: "90px-S2_Weapon_Main_Glooga_Dualies.png",		enName: "Glooga Dualies", 		jpName: ""});
weaponList.set("Glooga Dualies Deco", 	{filename: "90px-S2_Weapon_Main_Glooga_Dualies_Deco.png",		enName: "Glooga Dualies Deco", 		jpName: ""});
weaponList.set("Gold Dynamo Roller", 	{filename: "90px-S2_Weapon_Main_Gold_Dynamo_Roller.png",		enName: "Gold Dynamo Roller", 		jpName: ""});
weaponList.set("Goo Tuber", 	{filename: "90px-S2_Weapon_Main_Goo_Tuber.png",		enName: "Goo Tuber", 		jpName: ""});
weaponList.set("Grim Range Blaster", 	{filename: "90px-S2_Weapon_Main_Grim_Range_Blaster.png",		enName: "Grim Range Blaster", 		jpName: ""});
weaponList.set("H-3 Nozzlenose", 	{filename: "90px-S2_Weapon_Main_H-3_Nozzlenose.png",		enName: "H-3 Nozzlenose", 		jpName: ""});
weaponList.set("H-3 Nozzlenose D", 	{filename: "90px-S2_Weapon_Main_H-3_Nozzlenose_D.png",		enName: "H-3 Nozzlenose D", 		jpName: ""});
weaponList.set("Heavy Splatling", 	{filename: "90px-S2_Weapon_Main_Heavy_Splatling.png",		enName: "Heavy Splatling", 		jpName: ""});
weaponList.set("Heavy Splatling Deco", 	{filename: "90px-S2_Weapon_Main_Heavy_Splatling_Deco.png",		enName: "Heavy Splatling", 		jpName: ""});
weaponList.set("Heavy Splatling Remax", 	{filename: "90px-S2_Weapon_Main_Heavy_Splatling_Remix.png",		enName: "Heavy Splatling Remix", 		jpName: ""});


export function getWeapon(key: string): WeaponInfo | undefined {
    return weaponList.get(key);
}

export function getWeaponKeys() :IterableIterator<string> {
    return weaponList.keys();
}

export function getRandomWeapon() : WeaponInfo {
    let items = Array.from(weaponList.values());
    return items[Math.floor(Math.random() * items.length)];
}