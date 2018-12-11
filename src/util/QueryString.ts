import queryString from 'query-string';
import {Component, Vue} from 'annotation';

@Component
export default class QueryString extends Vue {
    
    /**
     * return query router as plain js object
     *
     * current limitation !!! window.location.search cannot reactive
     * to the template!!
     */
    public get routeQuery() {
        const hasVueRouter = this.$route && this.$router;
        
        return hasVueRouter ? this.$route.query : (window.location.search ? queryString.parse(window.location.search) : {});
    }
    
    public matchUrlQuery(link: string): boolean {
        const {routeQuery} = this;
        if (!Object.keys(routeQuery).length) {
            return location.pathname === link;
        } else if (link.indexOf('?') === -1) {
            return false;
            
        }
        
        const finalLink = '?' + link.split('?').slice(1).join();
        const linkQueryParsed = queryString.parse(finalLink);
        const routeQueryKey = Object.keys(routeQuery);
        const linkQueryKey = Object.keys(linkQueryParsed);
        if ((routeQueryKey.length && linkQueryKey.length) && (routeQueryKey.length === linkQueryKey.length)) {
            return routeQueryKey.every(key => {
                return linkQueryParsed[key];
            });
        }
        
        return false;
    }
}