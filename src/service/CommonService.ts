/**
 * Created by fajar on 01/23/2018.
 *
 * CommonService is service which help anywhere
 */

import {Singleton} from 'annotation';

@Singleton
export default class CommonService {
    
    // will set value from App Class
    public app: any;
}
