// https://splatoon2.ink/data/schedules.json
export interface iSchedule {
	regular: iRegularScheduleInfo[];
	gachi: iCompetitiveScheduleInfo[];
	league: iCompetitiveScheduleInfo[];
}

export interface iRegularScheduleInfo {
	game_mode: iGameMode;
	stage_a: iStage;
	stage_b: iStage;
	start_time: number;
	end_time: number;
}

export interface iCompetitiveScheduleInfo {
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
