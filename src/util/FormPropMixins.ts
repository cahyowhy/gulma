/**
 * Created by cahyo wibowo on 12/17/18
 */

import {Component, Vue, Prop} from 'annotation';

@Component
export default class FormPropMixins extends Vue {
	
	@Prop({type: String, default: ''})
	public size: string;
	
	@Prop({type: String, default: ''})
	public type: string;
	
	@Prop({type: String, default: ''})
	public position: string;
	
	@Prop({type: String, default: ''})
	public shape: string;
	
	public isFocused: boolean = false;
	
	public onBlur($event: any) {
		this.isFocused = false;
		this.$emit('blur', $event);
	}
	
	public onFocus($event: any) {
		this.isFocused = true;
		this.$emit('focus', $event);
	}
}