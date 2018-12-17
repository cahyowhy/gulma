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
	import {Component, Mixin, Prop} from "annotation";
	import FormPropMixins from '../../../util/FormPropMixins';

	@Component
	export default class Button extends Mixin(FormPropMixins) {

		@Prop({default: ''})
		private tooltipText: string;

		@Prop({default: false})
		private isLoading: boolean;

		@Prop({default: false})
		private isTooltipActive: boolean;

		@Prop({default: ''})
		private value: string;

		private get tooltipClassNameFinal() {
			const {tooltipText, value, type, position, isTooltipActive} = this;
			const typeClassName = type ? ('is-tooltip-' + type) : '';
			const positionClassName = position ? ('is-tooltip-' + position) : '';
			const tooltipClassNames = [
				'tooltip', typeClassName, positionClassName,
				{'is-tooltip-multiline': tooltipText.length > 60}, {'is-tooltip-active': isTooltipActive}
			];

			return tooltipText && !value.length ? tooltipClassNames : '';
		}

		private get className() {
			const {type, size, isLoading, shape, value, tooltipClassNameFinal}: any = this;
			const typeClassName = type ? ('is-' + type) : '';
			const sizeClassName = size ? ('is-' + size) : '';
			const shapeClassName = shape ? ('is-' + shape) : '';
			const loadingClassName = isLoading ? 'is-loading' : '';

			return [
				'button g-button', typeClassName, sizeClassName, shapeClassName,
				tooltipClassNameFinal, {'is-loading': isLoading}
			];
		}
	}
</script>