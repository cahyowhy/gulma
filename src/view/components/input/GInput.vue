<!--suppress ALL -->
<template>
    <div class="control g-input-wrp" :class="controlClassName">
        <input v-if="inputType !== 'textarea'" :type="inputType" :class="className" :value="newValue" v-bind="$attrs"
               @input="onInput" @focus="onFocus" @blur="onBlur" :maxlength="maxlength" ref="input">
        <textarea v-else :class="className" :value="newValue" v-bind="$attrs" :maxlength="maxlength"
                  @input="onInput" @focus="onFocus" @blur="onBlur" ref="textarea"></textarea>
        <span v-if="$slots.iconLeft" :class="`icon is-left ${size ? ('is-'+size) : ''}`">
            <slot name="iconLeft"></slot>
        </span>
        <span v-if="$slots.iconRight" :class="`icon is-right ${size ? ('is-'+size) : ''}`">
            <slot name="iconRight"></slot>
        </span>
        <span v-if="maxlength && isFocused && (inputType === 'textarea' || inputType === 'text') ">
            <p class="help count-help">{{countValue}}/{{maxlength}}</p>
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

		@Prop({default: ''})
		private label: string;

		@Prop({default: ''})
		private message: string;

		@Prop({default: false})
		private isFocused: boolean;

		@Prop({default: false})
		private isStatic: boolean;

		@Prop({default: false})
		private isLoading: boolean;

		@Prop({default: false})
		private isExpanded: boolean;

		@Prop()
		private maxlength: any;

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

		private countValue: number = 0;

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
			const {isLoading, size, isExpanded, $slots} = this;
			const {iconLeft, iconRight} = $slots;

			return [{
				'is-loading': isLoading,
				'has-icons-left': iconLeft,
				'is-expanded': isExpanded,
				'has-icons-right': iconRight
			}, (size ? ('is-' + size) : '')];
		}

		private onInput(event) {
			this.newValue = event.target.value;
			this.countValue = event.target.value.length;
		}
	}
</script>