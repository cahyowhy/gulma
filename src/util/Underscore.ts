const cloneArray = (arrays: Array<any>): Array<any> => {
    if (arrays.length) {
        let clone: Array<any> = [];
        
        arrays.forEach(item => clone.push(Array.isArray(item) ?
            cloneArray(item) : typeof item === 'object' ? Object.assign({}, item) : item));
        
        return clone;
    }
    
    return [];
};

export {cloneArray};