/**
 * Created by cahyo wibowo on 12/12/18
 */

const dummyTabsLinks: Function = (applyUrl: boolean = true) => {
	return new Array(4).fill(location.pathname)
		.map((item: string, index: number) => {
			let name = item + `-${index}`;
			name = name.substring(1);
			
			let param = {name};
			if (applyUrl) param['to'] = index ? (item + `?link-${index}=true`) : item;
			
			return param;
		})
};

export {dummyTabsLinks};