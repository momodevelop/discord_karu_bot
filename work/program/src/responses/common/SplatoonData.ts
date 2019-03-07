import { common } from 'common/common';

export enum RuleTypes {
	RAINMAKER = 0,
	CLAM_BLITZ,
	TOWER_CONTROL,
	SPLAT_ZONES
}

export class RuleInfo {
	private conditions: string[];
	private key: string;
	private name: string;
	private type: RuleTypes;

	get Conditions(): string[] { return this.conditions };
	get Key(): string { return this.key };
	get Name(): string { return this.name };
	get Type(): RuleTypes { return this.type; };

	constructor(type: RuleTypes, key: string, name: string, conditions: string[]) {
		this.type = type;
		this.key = key;
		this.name = name;
		this.conditions = conditions;
	}
}

// Ensure that there are the same amount of rules as enums
let ruleArray: RuleInfo[] = [];
ruleArray.push(new RuleInfo(RuleTypes.RAINMAKER, "rainmaker", "Rainmaker", ["rainmaker", "hoko"]));
ruleArray.push(new RuleInfo(RuleTypes.CLAM_BLITZ, "clam_blitz", "Clam Blitz", ["clam blitz", "asari"]));
ruleArray.push(new RuleInfo(RuleTypes.TOWER_CONTROL, "tower_control", "Tower Control", ["tower", "yagura"]));
ruleArray.push(new RuleInfo(RuleTypes.SPLAT_ZONES, "splat_zones", "Splat Zones", ["zones", "zone", "area"]));

export function getRuleInfo(rule: RuleTypes) {
	return ruleArray[rule];
}

export function getRuleByCondition(condition: string): RuleInfo | null {
	for (let i: number = 0; i < ruleArray.length; ++i) {
		if (common.has_words(condition, ruleArray[i].Conditions)) {
			return ruleArray[i];
		}
	}
	return null;
}