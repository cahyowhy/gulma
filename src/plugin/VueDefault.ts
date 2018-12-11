/**
 * Created by fajar on 01/22/2018.
 *
 * Vue Default config instance
 * to inject or register anything can be here
 */

import {Vue} from 'annotation';
import Constant from '../config/Constant';

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.silent = true;

// exporting constant string property to template
Vue.prototype.Constant = Constant;

// handle error
Vue.config.errorHandler = (error: any) => console.log(error);

// register all component, ex: NagivationBar => accessible to navigation-bar
const components: any = require.context('../view/components', true, /\.(vue)$/i);
components.keys().map((key: any) => {
    let componentName: any = key.match(/\w+/)[0];

    // check has sub folder
    if ((key.match(/\//g) || []).length > 1) {
      componentName = key.split('/');
      componentName = componentName[componentName.length - 1];
      componentName = componentName.match(/\w+/)[0];
    }
    
    Vue.component(componentName, components(key).default);
});
