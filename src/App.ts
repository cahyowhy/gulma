/**
 * Created by fajar on 01/22/2018.
 *
 * File loader to instance Vue as app using
 * assign vue instance into common service
 * to make instance more accessible
 */

import {Vue, Inject} from 'annotation';

import router from './plugin/VueRouter';
import i18n from './plugin/VueI18n';
import meta from './plugin/VueMeta';

import './plugin/VueDefault';

/** Importing global style (wont live reload on modify */
import './style/Style.scss';

/** Importing common/global service to set value */
import CommonService from './service/CommonService';

/** Import promise finally **/
import {shim} from 'promise.prototype.finally';

class App {
    
    @Inject
    private commonService: CommonService;
    
    constructor() {
        
        shim();
        
        const context: App = this;
        
        // assign vue instance to CommonService
        context.commonService.app = new Vue({
            el: '.app', // <= directly mount to html
            i18n: i18n,
            router: router,
            metaInfo: meta()
        });
    }
}

export default new App();
