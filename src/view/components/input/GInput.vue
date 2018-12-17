<!--suppress ALL -->
<template>
    <div class="control" :class="controlClassName">
        <input v-if="inputType !== 'textarea'" :type="inputType"
               :class="className" :value="newValue" v-bind="$attrs" @input="onInput">
        <textarea v-else :class="className" :value="newValue" v-bind="$attrs"
                  @input="onInput"></textarea>
        <span v-if="$slots.iconLeft" :class="`icon is-left ${size ? ('is-'+size) : ''}`">
            <slot name="iconLeft"></slot>
        </span>
        <span v-if="$slots.iconRight" :class="`icon is-right ${size ? ('is-'+size) : ''}`">
            <slot name="iconRight"></slot>
        </span>
    </div>
</template>

<script lang="ts">
	import {Component, Mixin, Prop, Watch} from 'annotation';
	import FormPropMixins from '../../../util/FormPropMixins';

	@Component
	export default class GInput extends Mixin(FormPropMixins) {

		@Prop()
		private value: any;

		@Prop({default: 'text'})
		private inputType: string;

		@Prop({default: false})
		private isFocused: boolean;

		@Prop({default: false})
		private isStatic: boolean;

		@Prop({default: false})
		private isLoading: boolean;

		@Watch('value')
		private onValueChange(value) {
			this.newValue = value;
		}

		@Watch('newValue')
		private onNewValueChange(value) {
			this.$emit('input', value);
		}

		private newValue: any = this.value;

		private get alterClassName() {
			if (this.$parent.isFieldComponent) {
				const {type, size} = this.$parent;
				return [type, size].reduce((accu, item) => accu + (item ? ` is-${item}` : ''), '');
			}

			return '';
		}

		private get className() {
			const {type, size, shape, isFocused, isStatic, alterClassName, inputType}: any = this;
			const finalClassName = [type, size, shape].reduce((accu, item) => accu + (item ? `is-${item} ` : ''), '');

			return [
				'g-input', (inputType !== 'textarea' ? 'input' : 'textarea'),
				finalClassName, {'is-focused': isFocused, 'is-static': isStatic},
				alterClassName
			]
		}

		private get controlClassName() {
			const {isLoading, size, $slots} = this;
			const {iconLeft, iconRight} = $slots;

			return [{
				'is-loading': isLoading,
				'has-icons-left': iconLeft,
				'has-icons-right': iconRight
			}, (size ? ('is-' + size) : '')];
		}

		private onInput(event) {
			this.$nextTick(() => {
				this.newValue = event.target.value
			});
		}
	}
</script>