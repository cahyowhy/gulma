/**
 * Created by cahyo wibowo on 12/19/18
 */

import {deserialize} from "cerialize";

export default class ComponentApiProps {
	
	@deserialize
	private name: string = '';
	
	@deserialize
	private description: string = '';
	
	@deserialize
	private type: string = '';
	
	@deserialize
	private values: string = '';
	
	@deserialize
	private defaultValue: string = '';
	
	public table(): any {
		const {name, description, type, values, defaultValue} = this;
		
		return {name, description, type, values, defaultValue};
	}
	
	public static Columns(): Array<any> {
		return [
			{name: 'Name'}, {name: 'Description'}, {name: 'Type'},
			{name: 'Values'}, {name: 'Default'},
		];
	}
}