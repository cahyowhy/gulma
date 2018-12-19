/**
 *  Created by cahyo on 06/20/2018.
 */

import {deserialize} from "cerialize";

export default class User {
	
	@deserialize
	public gender: string = "";
	
	@deserialize
	public name: string = "";
	
	@deserialize
	public location: string = "";
	
	@deserialize
	public email: string = "";
	
	@deserialize
	public dob: any = {date: '', age: 0};
	
	@deserialize
	public picture: string = "";
	
	@deserialize
	public phone: string = "";
	
	@deserialize
	public cell: string = "";
	
	public table(): any {
		const {name, dob, email, phone, location} = this;
		
		return {name, dob: dob.age, email, phone, location};
	}
	
	public static Columns(): Array<any> {
		return [
			{name: 'Name'}, {name: 'Age', position: 'centered', sorting: true, width: '50', key: 'dob'},
			{name: 'Email', sorting: true, key: 'email'}, {name: 'Phone', position: 'centered'}, {name: 'Location'}
		];
	}
	
	public static OnDeserialized(instance: User, json: any) {
		if (json.name && json.name.title && json.name.first && json.name.last) {
			const {title, first, last} = json.name;
			
			instance.name = `${title} ${first} ${last}`;
		}
		
		if (json.location && json.location.street && json.location.city && json.location.state) {
			const {street, city, state} = json.location;
			
			instance.location = `${street}, ${city}, ${state}`;
		}
		
		if (json.picture && json.picture.medium) {
			instance.picture = json.picture.medium;
		}
	}
}
