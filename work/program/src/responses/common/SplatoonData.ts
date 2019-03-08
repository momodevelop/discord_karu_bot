import { hasWords } from 'common/common';


export namespace Rule {
	export enum Types {
		RAINMAKER = 0,
		CLAM_BLITZ,
		TOWER_CONTROL,
		SPLAT_ZONES
	}

	export class Info {
		public readonly conditions: string[];
		public readonly key: string;
		public readonly name: string;
		public readonly type: Types;

		constructor(type: Types, key: string, name: string, conditions: string[]) {
			this.type = type;
			this.key = key;
			this.name = name;
			this.conditions = conditions;
		}
	}

	let ruleInfoArray: Info[] = [];
	ruleInfoArray.push(new Info(Types.RAINMAKER, "rainmaker", "Rainmaker", ["rainmaker", "hoko"]));
	ruleInfoArray.push(new Info(Types.CLAM_BLITZ, "clam_blitz", "Clam Blitz", ["clam blitz", "asari"]));
	ruleInfoArray.push(new Info(Types.TOWER_CONTROL, "tower_control", "Tower Control", ["tower", "yagura"]));
	ruleInfoArray.push(new Info(Types.SPLAT_ZONES, "splat_zones", "Splat Zones", ["zones", "zone", "area"]));


	export function getInfo(rule: Types) {
		return ruleInfoArray[rule];
	}

	export function getRuleByCondition(condition: string): Info | null {
		for (let i: number = 0; i < ruleInfoArray.length; ++i) {
			if (hasWords(condition, ruleInfoArray[i].conditions)) {
				return ruleInfoArray[i];
			}
		}
		return null;
	}

}

export namespace Battle {
	export enum Types {
		REGULAR = 0,
		GACHI,
		LEAGUE
	}

	export class Info {
		public readonly color: [number, number, number];
		public readonly thumbnailImg: string;
		public readonly outputImg: string;
		public readonly conditions: string[];
		public readonly type: Types;

		constructor(type: Types, outputImg: string, thumbnailImg: string, color: [number, number, number], conditions: string[]) {
			this.type = type;
			this.outputImg = outputImg;
			this.thumbnailImg = thumbnailImg;
			this.color = color;
			this.conditions = conditions;
		}
	}

	let battleInfoArray: Info[] = [];
	battleInfoArray.push(new Info(Types.REGULAR, "out_regular.jpg", "regular.png", [207, 246, 34], ["regular, turf"]));
	battleInfoArray.push(new Info(Types.GACHI, "out_gachi.jpg", "gachi.png", [245, 73, 16], ["gachi", "ranked", "rank"]));
	battleInfoArray.push(new Info(Types.LEAGUE, "out_league.jpg", "league.png", [240, 45, 125], ["league"]));

	export function getInfo(battle: Types) {
		return battleInfoArray[battle];
	}
}




