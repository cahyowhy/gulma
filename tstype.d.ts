/**
 * Created by fajar on 03/10/2018.
 *
 * typescript declaration of unknown file or
 * file are have two choices base on profile
 */

declare module '*.vue' {
  import Vue = require('vue');

  const value: Vue.ComponentOptions<Vue>;
  export default value;
}

// src/config/environment? Development.ts or Productions.ts
declare module 'environment';

// src/util/Annotation
declare module 'annotation';

// fix module
declare module 'promise.prototype.finally';

// optional
declare module 'query-string';