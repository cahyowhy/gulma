/**
 * Created by cahyo wibowo on 12/17/18
 */
import {Component, Prop, Vue} from "annotation";

const SIZE = ['small', 'medium', 'large', ''];

@Component
export default class GFieldlabel extends Vue {
	
	@Prop({
		default: '',
		validator: (val: string) => SIZE.indexOf(val) !== -1
		
	})
	public size: string;
	
	@Prop({default: false})
	public isHorizontal: boolean;
	
	public render(createElement: Function) {
		const {size, isHorizontal} = this;
		let className = (size ? ('is-' + size) : '');
		const mainLabel = createElement('label', {class: 'label'}, this.$slots.default);
		
		if (isHorizontal) {
			className += ' field-label';
		} else {
			className += ' label';
		}
		
		if (isHorizontal) {
			return createElement('div', {class: className}, [mainLabel])
		}
		
		return createElement('label', {class: className}, this.$slots.default);
	}
}