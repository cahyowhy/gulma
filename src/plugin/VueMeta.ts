/**
 * Created by fajar on 01/26/2018.
 *
 * Vue meta instanced
 */

import {Vue} from 'annotation';
import Meta from 'vue-meta';

export default () => {

  Vue.use(Meta, {
    keyName: 'metaInfo', // key name in component
    attribute: 'gulma-meta', // uses to add in the tags to observes
    ssrAttribute: 'gulma-meta-server', // uses to determine meta info has already been server-rendered
    tagIDKeyName: 'gulmaId' // uses to determine whether to overwrite or append a tag (as ID)
  });

  // return default meta info value
  return {
    title: ' ',
    titleTemplate: '%s',
    bodyAttrs: {
      class: 'body-page'
    }
  }
}
