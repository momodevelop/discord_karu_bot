// https://splatoon2.ink/data/schedules.json
export interface iSchedule {
	regular: iScheduleInfo[];
	gachi: iScheduleInfo[];
	league: iScheduleInfo[];
}

export interface iScheduleInfo {
	game_mode: iGameMode;
	stage_a: iStage;
	stage_b: iStage;
	start_time: number;
	end_time: number;
	rule: iRule;
}

export interface iRule {
	name: string;
	multiline_name: string;
	key: string;
}

export interface iStage {
	id: string;
	name: string;
	image: string;
}

interface iGameMode {
	key: string;
	name: string;
}
