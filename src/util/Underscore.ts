const cloneArray = (arrays: Array<any>): Array<any> => {
	if (arrays.length) {
		let clone: Array<any> = [];
		
		arrays.forEach(item => clone.push(Array.isArray(item) ?
			cloneArray(item) : typeof item === 'object' ? Object.assign({}, item) : item));
		
		return clone;
	}
	
	return [];
};

const omit = (param: any = {}, omits: Array<string>): any => {
	let params: any = {};
	Object.keys(param).forEach(item => {
		if (!omits.includes(item)) {
			params[item] = param[item];
		}
	});
	
	return params;
};

export {cloneArray, omit};