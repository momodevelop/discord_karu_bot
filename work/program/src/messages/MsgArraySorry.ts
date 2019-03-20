const messages: string[] = [
	"I'm sorry T_T"
]

export function randMsg(): string {
	let rand: number = Math.floor(Math.random() * messages.length);
	return messages[rand];
}