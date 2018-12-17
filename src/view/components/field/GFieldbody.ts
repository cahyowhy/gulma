import {Component, Prop, Mixin} from "annotation";
import GField from './GField.vue'
import FormPropMixins from '../../../util/FormPropMixins';

@Component()
export default class GFieldbody extends Mixin(FormPropMixins) {
	
	@Prop({default: ''})
	public message: string;
	
	@Prop({default: false})
	public isNarrow: boolean;
	
	public render(createElement: Function) {
		const {message, type, isNarrow, size, position, shape} = this;
		return createElement('div', {class: 'field-body'}, this.$slots.default.map((item: any) => {
			const {tag, propsData} = item.componentOptions;
			
			if (!item.tag) {
				return item
			}
			
			const attr = {props: {message, type, isNarrow, size, position, shape}};
			if (isNarrow) attr['class'] = 'is-narrow';
			
			if (tag === 'g-input') {
				attr.props['label'] = propsData.label;
				attr.props['message'] = propsData.message;
				attr.props['type'] = propsData.type;
			}
			
			return createElement(GField, attr, [item]);
		}));
	}
}