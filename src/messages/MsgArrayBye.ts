
const messages: string[] = [
	"Byeeeeee~!",
	"Noooooooo come back!! Okay...bye...TvT",

]

export function rand_msg(): string {
	let rand: number = Math.floor(Math.random() * messages.length);
	return messages[rand];
}