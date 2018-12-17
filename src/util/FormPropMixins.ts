/**
 * Created by cahyo wibowo on 12/17/18
 */

const SIZE = ['small', 'medium', 'large', ''];
const TYPE = ['info', 'success', 'warning', 'danger', ''];
const POSITION = ['centered', 'right', ''];
const SHAPE = ['rounded', 'sharped', ''];

import {Component, Vue, Prop} from 'annotation';

@Component
export default class FormPropMixins extends Vue {
	
	@Prop({
		default: '',
		validator: (val: any) => SIZE.indexOf(val) !== -1
	})
	public size: string;
	
	@Prop({
		default: '',
		validator: (val: any) => TYPE.indexOf(val) !== -1
	})
	public type: string;
	
	@Prop({
		default: '',
		validator: (val: any) => POSITION.indexOf(val) !== -1
	})
	public position: string;
	
	@Prop({
		default: '',
		validator: (val: any) => SHAPE.indexOf(val) !== -1
	})
	public shape: string;
}