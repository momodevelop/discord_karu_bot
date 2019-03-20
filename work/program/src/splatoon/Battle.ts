import { hasWords } from 'common/Utils';

export enum Types {
    REGULAR = 0,
    GACHI,
    LEAGUE
}

export class Info {
    public readonly color: [number, number, number];	// Color for output
    public readonly thumbnailImg: string;				// thumbnail to use for output
    public readonly outputImg: string;					// name of output file for output
    public readonly conditions: string[];				// Used to identify the Info based on user input
    public readonly type: Types;						// Main idenitifier, like a 'Primary Key'
    public readonly name: string;						// The name of the battle type

    constructor(type: Types, name: string, outputImg: string, thumbnailImg: string, color: [number, number, number], conditions: string[]) {
        this.type = type;
        this.outputImg = outputImg;
        this.thumbnailImg = thumbnailImg;
        this.color = color;
        this.name = name;
        this.conditions = conditions;
    }
}

let battleInfoArray: Info[] = [];
battleInfoArray.push(new Info(Types.REGULAR, "Turf Wars", "out_regular.jpg", "regular.png", [207, 246, 34], ["regular", "turf"]));
battleInfoArray.push(new Info(Types.GACHI, "Ranked", "out_gachi.jpg", "gachi.png", [245, 73, 16], ["gachi", "ranked", "rank"]));
battleInfoArray.push(new Info(Types.LEAGUE, "League", "out_league.jpg", "league.png", [240, 45, 125], ["league"]));

export function getInfo(battle: Types) {
    return battleInfoArray[battle];
}

export function getTypeByCondition(condition: string): Info | null {
    for (let i: number = 0; i < battleInfoArray.length; ++i) {
        if (hasWords(condition, battleInfoArray[i].conditions)) {
            return battleInfoArray[i];
        }
    }
    return null;
}