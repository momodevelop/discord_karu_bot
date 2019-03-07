import { common } from 'common/common';

export enum eRuleTypes {
	RAINMAKER = 0,
	CLAM_BLITZ,
	TOWER_CONTROL,
	SPLAT_ZONES
}

export class cRuleInfo {
	private conditions: string[];
	private key: string;
	private name: string;
	private type: eRuleTypes;

	get Conditions(): string[] { return this.conditions };
	get Key(): string { return this.key };
	get Name(): string { return this.name };
	get Type(): eRuleTypes { return this.type; };

	constructor(type: eRuleTypes, key: string, name: string, conditions: string[]) {
		this.type = type;
		this.key = key;
		this.name = name;
		this.conditions = conditions;
	}
}

// Ensure that there are the same amount of rules as enums
let ruleArray: cRuleInfo[] = [];
ruleArray.push(new cRuleInfo(eRuleTypes.RAINMAKER, "rainmaker", "Rainmaker", ["rainmaker", "hoko"]));
ruleArray.push(new cRuleInfo(eRuleTypes.CLAM_BLITZ, "clam_blitz", "Clam Blitz", ["clam blitz", "asari"]));
ruleArray.push(new cRuleInfo(eRuleTypes.TOWER_CONTROL, "tower_control", "Tower Control", ["tower", "yagura"]));
ruleArray.push(new cRuleInfo(eRuleTypes.SPLAT_ZONES, "splat_zones", "Splat Zones", ["zones", "zone", "area"]));

export function getRuleInfo(rule: eRuleTypes) {
	return ruleArray[rule];
}

export function getRuleByCondition(condition: string): cRuleInfo | null {
	for (let i: number = 0; i < ruleArray.length; ++i) {
		if (common.has_words(condition, ruleArray[i].Conditions)) {
			return ruleArray[i];
		}
	}
	return null;
}