import { hasWords } from 'common/Utils';

export enum Types {
    RAINMAKER = 0,
    CLAM_BLITZ,
    TOWER_CONTROL,
    SPLAT_ZONES
}

export class Info {
    public readonly conditions: string[];	// Used to identify the Info based on user input
    public readonly key: string;			// Used to identify the Info with the key given by SplatoonInkApi
    public readonly name: string;			// Used for output
    public readonly type: Types;			// Main idenitifier, like a 'Primary Key'

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

export function getTypeByCondition(condition: string): Info | null {
    for (let i: number = 0; i < ruleInfoArray.length; ++i) {
        if (hasWords(condition, ruleInfoArray[i].conditions)) {
            return ruleInfoArray[i];
        }
    }
    return null;
}