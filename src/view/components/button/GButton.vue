<!--suppress ALL -->
<template>
    <div class="wrapper-c">
        <div v-if="value" :class="`submit-input-wrp ${tooltipClassNameFinal}`" :data-tooltip="tooltipText">
            <input type="submit" :value="value" :class="className">
        </div>
        <a v-else :class="className" :data-tooltip="tooltipText" @click="$emit('click')">
            <slot></slot>
        </a>
    </div>
</template>

<script lang="ts">
	import {Component, Vue, Prop} from "annotation";

	const TYPE = ['white', 'light', 'dark', 'black', 'text', 'primary', 'link',
		'info', 'success', 'warning', 'danger', ''];
	const SIZE = ['small', 'medium', 'large', ''];
	const SHAPE = ['rounded', 'sharped', ''];

	@Component
	export default class Button extends Vue {

		@Prop({
			default: '',
			validator: (val) => TYPE.indexOf(val) !== -1
		})
		private type: string;

		@Prop({
			default: '',
			validator: (val) => SIZE.indexOf(val) !== -1

		})
		private size: string;

		@Prop({
			default: '',
			validator: (val) => SHAPE.indexOf(val) !== -1

		})
		private shape: string;

		@Prop({default: ''})
		private tooltipText: string;

		@Prop({default: false})
		private isLoading: boolean;

		@Prop({default: ''})
		private tooltipClassName: string;

		@Prop({default: ''})
		private value: string;

		private get tooltipClassNameFinal() {
			const {tooltipText, tooltipClassName} = this;

			// by default if tooltipText length >= 60 apply is-tooltip-multiline class name
			return tooltipText ? `tooltip ${tooltipClassName} ${tooltipText.length > 59 ?
				'is-tooltip-multiline' : ''}` : '';
		}

		private get className() {
			const {type, size, isLoading, shape, value, tooltipClassNameFinal}: any = this;
			const typeClassName = type ? ('is-' + type) : '';
			const sizeClassName = size ? ('is-' + size) : '';
			const shapeClassName = shape ? ('is-' + shape) : '';
			const loadingClassName = isLoading ? 'is-loading' : '';
			const tooltipClassName = value ? '' : tooltipClassNameFinal;

			return [typeClassName, sizeClassName, tooltipClassName, loadingClassName, shapeClassName]
				.reduce((accu, item) => accu + (item ? (' ' + item) : ''), 'button g-button');
		}
	}
</script>