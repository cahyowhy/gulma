<!--suppress ALL -->
<template>
    <div :class="controlClassName">
        <div :class="selectWrapperClassName">
            <select :class="className" :size="nativeSize" :multiple="isMultiple" v-bind="$attrs"
                    @focus="onFocus" @blur="onBlur" v-model="newValue">
                <template v-if="placeholder && !newValue">
                    <option selected disabled hidden :value="placeholderValue">
                        {{ placeholder }}
                    </option>
                </template>
                <slot></slot>
            </select>
        </div>
        <span v-if="$slots.iconLeft" :class="`icon is-left ${size ? ('is-'+size) : ''}`">
            <slot name="iconLeft"></slot>
        </span>
    </div>
</template>

<script lang="ts">
	import {Component, Prop, Mixin, Watch} from 'annotation';
	import FormPropMixins from '../../../util/FormPropMixins';

	@Component
	export default class GSelect extends Mixin(FormPropMixins) {

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

		@Prop({default: false})
		private isFullwidth: boolean;

		@Prop()
		private isMultiple: boolean;

		@Prop()
		private nativeSize: any;

		@Prop({default: ''})
		private placeholder: string;

		@Prop({default: null})
		private value: any;

		private placeholderValue: any;

		@Watch('value', {immediate: true})
		private onValueChange(value) {
			this.selected = value;

			// for placeholder so can appear as the default selected value
			// if the value is null, '', undefined, 0
			if (!value) {
				this.placeholderValue = value;
			}
		}

		private selected: any = this.value;

		private get newValue() {
			return this.selected;
		}

		private set newValue(value) {
			this.selected = value;
			this.$emit('input', value);
		}

		private get alterClassName() {
			if (this.$parent.isFieldComponent) {
				const {type, size} = this.$parent;
				return [type, size].reduce((accu, item) => accu + (item ? ` is-${item}` : ''), '');
			}

			return '';
		}

		private get className() {
			const {isFocused}: any = this;

			return [{'is-focused': isFocused}];
		}

		private get controlClassName() {
			const {$slots, isExpanded} = this;

			return [{'has-icons-left': $slots.iconLeft, 'is-expanded': isExpanded}, 'g-select control']
		}

		private get selectWrapperClassName() {
			const {isLoading, type, size, shape, isMultiple, alterClassName, isFullwidth} = this;
			const finalClassName = [type, size, shape].reduce((accu, item) => accu + (item ? `is-${item} ` : ''), '');

			return ['select', finalClassName, alterClassName, {
				'is-loading': isLoading, 'is-multiple': isMultiple, 'is-fullwidth': isFullwidth
			}];
		}
	}
</script>