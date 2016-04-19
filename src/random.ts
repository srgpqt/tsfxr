
export function rnd(n: number) {
	return Math.floor(Math.random() * (n + 1));
}

export function frnd(range: number) {
	return Math.random() * range;
}

export function pick(choices: Array<any>) {
	return choices[Math.floor(Math.random() * choices.length)];
}
