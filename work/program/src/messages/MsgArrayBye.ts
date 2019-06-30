
const messages: string[] = [
	"Byeeeeee~! XDDD",
	"Noooooooo come back!! Okay...bye...TvT",
]

export function randMsg(): string {
	let rand: number = Math.floor(Math.random() * messages.length);
	return messages[rand];
}