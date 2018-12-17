/**
 * Created by cahyo wibowo on 12/17/18
 */

import {Component, Vue, Prop} from 'annotation';

@Component
export default class FormPropMixins extends Vue {
	
	@Prop({default: ''})
	public size: string;
	
	@Prop({default: ''})
	public type: string;
	
	@Prop({default: ''})
	public position: string;
	
	@Prop({default: ''})
	public shape: string;
}