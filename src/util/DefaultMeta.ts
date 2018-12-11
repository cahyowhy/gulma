/**
 * Created by cahyo wibowo on 12/11/18
 */

import Constant from '../config/Constant';

const siteDescription = (content: string = Constant.INFO.SITE_DESCRIPTION) => {
    return [{
        'name': 'description',
        'content': content
    }, {
        'property': 'og:description',
        'content': content
    }]
};

const siteTitle = (content: string = Constant.INFO.SITE_TITLE) => {
    return {
        title: content,
        meta: [{
            'property': 'og:title',
            'content': content
        }]
    }
};

const defaultMeta = [{
    'property': 'og:locale',
    'content': 'en_US'
}, {
    'property': 'og:type',
    'content': 'website'
}, {
    'property': 'og:site_name',
    'content': 'Gulma'
}, {
    'property': 'og:image',
    'content': location.origin + '/assets/images/banner.png'
}, {
    'property': 'og:image_type',
    'content': 'image/png'
}];

const constructSiteInfo = (title: string = Constant.INFO.SITE_TITLE, descr: string = Constant.INFO.SITE_DESCRIPTION): any => {
    const titleSite = siteTitle(title);
    return {
        title: titleSite.title,
        meta: [
            ...titleSite.meta,
            ...siteDescription(descr),
            ...defaultMeta
        ]
    }
};

export {defaultMeta, siteDescription, siteTitle};
export default constructSiteInfo;