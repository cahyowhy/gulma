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
import ComponentApi from '../models/ComponentApi';

@Singleton
export default class UserService extends ProxyService {
	
	public api: string = environment.COMPONENT_API_API; // define api url to fetch data
	
	public serializer: EntityAware = ComponentApi;
	
	public find(param: any = {}): Promise<any> {
		const afterSuccess = (response: any) => {
			if (Array.isArray(response)) {
				return Deserialize(response, this.serializer);
			}
			
			return [];
		};
		
		return super.find(param, afterSuccess);
	}
}
