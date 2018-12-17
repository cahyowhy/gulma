/**
 * Created by fajar on 03/12/2018.
 *
 * File environment for production
 * this file can import by alias 'environment'
 */

import BaseEnvironment from './BaseEnvironment';

export default ((ENV: any) => {
	
	ENV.LOGGER = false;
	
	ENV.USER_API = 'https://randomuser.me/api';

  return ENV;
})(BaseEnvironment);
