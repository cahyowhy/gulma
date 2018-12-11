/**
 * Created by fajar on 01/22/2018.
 *
 * Config for mapping route for every page
 * please use loadPage to split code to ensure
 * not load all page in one request
 */

const loadPage: Function = (file: string) => () => import('../view/pages/' + file).catch(console.log);

export default [
    /** route for authenticating on process login user */
    {
        path: '/', component: loadPage('Layout'),
        children: [
            {path: '/', component: loadPage('Index')}
        ]
    }
];
