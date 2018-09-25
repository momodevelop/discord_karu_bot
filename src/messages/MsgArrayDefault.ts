
const messages: string[] = [
	"Huh?",
	"What?",
	"Eh?",
	"This is Karu, Sui is away cooking~! ^^",
	"Huh?",
	"Wait, what?",
	"Nani?",
]

export function rand_msg(): string {
	let rand: number = Math.floor(Math.random() * messages.length);
	return messages[rand];
}