// https://splatoon2.ink/data/schedules.json
export interface Schedule {
	regular: ScheduleInfo[];
	gachi: ScheduleInfo[];
	league: ScheduleInfo[];
}

export interface ScheduleInfo {
	game_mode: GameMode;
	stage_a: Stage;
	stage_b: Stage;
	start_time: number;
	end_time: number;
	rule: Rule;
}

export interface Rule {
	name: string;
	multiline_name: string;
	key: string;
}

export interface Stage {
	id: string;
	name: string;
	image: string;
}

interface GameMode {
	key: string;
	name: string;
}
