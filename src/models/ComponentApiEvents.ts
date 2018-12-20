/**
 * Created by cahyo wibowo on 12/20/18
 */

import {deserialize} from "cerialize";

export default class ComponentApiEvents {
	
	@deserialize
	private name: string = '';
	
	@deserialize
	private description: string = '';
	
	@deserialize
	private parameters: string = '';
	
	public table(): any {
		const {name, description, parameters} = this;
		
		return {name, description, parameters};
	}
	
	public static Columns(): Array<any> {
		return [
			{name: 'Name'}, {name: 'Description'}, {name: 'Parameter'}
		];
	}
}