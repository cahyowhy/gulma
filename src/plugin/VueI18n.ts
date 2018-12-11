/**
 * Created by fajar on 01/26/2018.
 *
 * Vue i18n translation locales plugin instanced
 */

import {Vue} from 'annotation';
import VueI18n from 'vue-i18n';

import environment from 'environment';
import englishLocale from '../locale/English';
import indonesianLocale from '../locale/Indonesian';

Vue.use(VueI18n);

export default new VueI18n({
  locale: environment.LOCALE,
  fallbackLocale: 'en',
  messages: {
    'en': englishLocale,
    'id': indonesianLocale
  }
});
