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