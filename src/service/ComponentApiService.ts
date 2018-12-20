/**
 * Created by cahyo on 06/20/2018.
 *
 * UserService class for provide User rest
 * with singleton concept provided by decorator
 */

import {Singleton} from 'annotation';
import environment from 'environment';
import {Deserialize} from 'cerialize';

import ProxyService from './Proxy';

import EntityAware from '../models/EntityAware';
import ComponentApiProps from '../models/ComponentApiProps';
import ComponentApiEvents from '../models/ComponentApiEvents';

@Singleton
export default class UserService extends ProxyService {
	
	public api: string = environment.COMPONENT_API_API; // define api url to fetch data
	
	public serializer: EntityAware = ComponentApiProps;
	
	public find(param: any = {}): Promise<any> {
		const afterSuccess = (response: any) => {
			if (Array.isArray(response.props)) {
				response.props = Deserialize(response.props, ComponentApiProps);
			}
			
			if (Array.isArray(response.events)) {
				response.events = Deserialize(response.events, ComponentApiEvents);
			}
			
			return response;
		};
		
		return super.find(param, afterSuccess);
	}
}
