/**
 * Created by fajar on 01/26/2018.
 *
 * ProxyService class for provide http request
 * with some available method and customization
 * which can extend to get this class functional
 */

import axios from 'axios';

import {Serialize} from 'cerialize';
import {Inject} from 'annotation';

import CommonService from './CommonService';

import EntityAware from '../models/EntityAware';

class ProxyService {
	
	@Inject
	public commonService: CommonService;
	
	public api: string = process.env.API_URL;
	
	public method: any = {
		post: 'POST',
		get: 'GET',
		put: 'PUT',
		delete: 'DELETE'
	};
	
	/**
	 * default method find, can be override on child
	 *
	 * @param {EntityAware} T entity which implement EntityAware
	 * @param afterSuccess
	 * @return {Promise<any>} promise response from api request
	 *         with deserialize when serializer are defined
	 */
	public find(T: EntityAware, afterSuccess: Function = (response: any) => response): Promise<any> {
		const promiseWrapper = this.promiseWraper(this.get(Serialize(T)), afterSuccess);
		
		return this.promiseTo(promiseWrapper);
	}
	
	/**
	 * post method for fetch(ajax) POST
	 * this method is different with other
	 * method because this method is customize
	 * for validate token too
	 *
	 * @param param {object} parameter data not allowed null
	 * @param api {string} parameter url API allowed empty ''
	 *        but on child constructor must passing default api
	 * @param headers {object} custom header (only for validate token)
	 */
	public post(param: any = null, api: string = '', headers: object = {}) {
		api = api === '' ? this.api : api;
		
		return this.request(this.method.post, api, param, headers)
	}
	
	/**
	 * get method for fetch(ajax) GET
	 *
	 * @param param {object} parameter data allow null
	 * @param api {string} parameter url API allowed empty ''
	 *        but on child constructor must passing default api
	 * @returns result from API
	 */
	public get(param: any = null, api: string = '') {
		api = api === '' ? this.api : api;
		
		return this.request(this.method.get, api, param);
	}
	
	/**
	 * put method for fetch(ajax) PUT
	 *
	 * @param param {object} parameter data not allowed null
	 * @param api {string} parameter url API allowed empty ''
	 *        but on child constructor must passing default api
	 * @param headers {object} custom header (only for upload image)
	 */
	public put(param: any = null, api: string = '', headers: object = {}) {
		api = api === '' ? this.api : api;
		
		return this.request(this.method.put, api, param, headers);
	}
	
	/**
	 * delete method for fetch(ajax) DELETE
	 *
	 * @param param {object} parameter data not allowed null
	 * @param api {string} parameter url API allowed empty ''
	 *        but on child constructor must passing default api
	 */
	public delete(param: any = null, api: string = '') {
		api = api === '' ? this.api : api;
		
		return this.request(this.method.delete, api, param);
	}
	
	/**
	 * buildApi method to build url api
	 *
	 * @param method {string} type method to be send GET PUT POST etc
	 * @param url {string} where this to be send not allowed null
	 * @param param {object|string} parameter data not allowed null
	 */
	private buildApi(method: string, url: string, param: any) {
		// filter query on method is 'GET'
		if (method === this.method.get && typeof param === 'object' && param !== null) {
			let query: string = '?';
			let index: number = 0;
			
			// loop param to add & at end param
			const objectLength: number = Object.keys(param).length;
			
			for (let key in param) {
				if (param.hasOwnProperty(key)) {
					index = index + 1;
					// if object is last not append '&' at end
					query = objectLength === index ? query + key + '=' + param[key] : query + key + '=' + param[key] + '&'
				}
			}
			
			url = url + query
			// handle when param is only string
		} else if ((typeof param === 'string' || typeof param === 'number') && param !== null) {
			url = url + param
		}
		
		return url
	}
	
	/**
	 * request method is main method to Make an HTTP Request
	 * base on XHR or familiar with ajax on JQUERY
	 * this method will auto covert param to JSON stringify format
	 * and if method is 'GET' will filter query on param
	 *
	 * usage: return this.request(type, 'http:localhost', param)
	 *
	 * @param method {string} method to be send GET PUT POST etc
	 * @param url {string} where this to be send not allowed null
	 * @param param {object} parameter data allowed null based on need
	 * @param headers {object} custom header
	 */
	private request(method: string, url: string, param: any = null, headers: object = {}) {
		const context: ProxyService = this;
		
		const validParam = param !== null && typeof param !== 'string' && typeof headers['Content-Type'] === 'undefined';
		
		let config: any = {
			timeout: 30000,
			method: method,
			data: validParam ? JSON.stringify(param) : param,
			
			// check containing 'Content-Type' in header, it mean refer to validate token
			url: typeof headers['Content-Type'] === 'undefined' ? context.buildApi(method, url, param) : url,
			
			// merging token in header when user has logged and not disable auth
			headers: Object.assign({'Content-Type': 'application/json'}, headers)
		};
		
		return new Promise((resolve, reject) => {
			axios(config).then((response: any) => {
				resolve(response.data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	
	public promiseTo(promise: Promise<any>): any {
		return promise
			.then(data => {
				return [null, data];
			})
			.catch(err => [err]);
	}
	
	public promiseWraper(promise: Promise<any>, afterSuccess: Function): Promise<any> {
		return new Promise((res, rej) => {
			promise
				.then(response => {
					res(afterSuccess(response));
				})
				.catch(e => rej(e));
		});
	}
}

export default ProxyService;