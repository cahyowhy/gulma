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
			
			// set label and message for props like
			// type (colors), size on field child
			if (tag === 'g-input' || tag === 'g-select') {
				attr.props['label'] = propsData.label;
				attr.props['message'] = propsData.message;
				attr.props['type'] = propsData.type;
				attr.props['size'] = propsData.size;
			}
			
			return createElement(GField, attr, [item]);
		}));
	}
}