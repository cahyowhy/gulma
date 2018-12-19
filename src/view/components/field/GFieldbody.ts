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
			
			const attr = {props: {}};
			if (isNarrow) attr['class'] = 'is-narrow';
			
			// jika direct child > 1 dan merupakan komponen dgn tag dibawah,
			// apply props dibawah, dari dirinya ke komponen GField yg akan dibuat
			// dengan syarat $slots.default.length === 1
			if ((tag === 'g-input' || tag === 'g-select') && this.$slots.default.length > 1) {
				attr.props['label'] = propsData.label;
				attr.props['message'] = propsData.message;
				attr.props['type'] = propsData.type;
				attr.props['size'] = propsData.size;
			} else {
				attr.props = {message, type, isNarrow, size, position, shape};
			}
			
			return createElement(GField, attr, [item]);
		}));
	}
}