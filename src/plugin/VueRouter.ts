/**
 * Created by fajar on 01/26/2018.
 *
 * Vue router instanced
 */

import {Vue} from 'annotation';
import VueRouter from 'vue-router';

import Routes from '../config/RouteMapping';

Vue.use(VueRouter);

const route = new VueRouter({
  routes: Routes,
  mode: 'history',
  fallback: false,
  linkActiveClass: 'active',
  scrollBehavior() {
    return {x: 0, y: 0};
  },
});

export default route;
