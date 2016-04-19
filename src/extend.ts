const hasOwn = {}.hasOwnProperty;

export default function extend(target: any, ...sources: Array<any>) {
	for (let i = 0; i < sources.length; ++i) {
		let src = sources[i];

		if (src) {
			for (let key in src) {
				if (hasOwn.call(src, key)) {
					target[key] = src[key];
				}
			}
		}
	}

	return target;
}
