<!--suppress ALL -->
<template>
    <label :class="className" :disabled="disabled">
        <input v-model="computedValue" :disabled="disabled" :name="name"
               :indeterminate.prop="indeterminate" type="checkbox" :value="nativeValue"
               :true-value="trueValue" :false-value="falseValue">
        <span class="checked"></span>
        <span class="control"><slot/></span>
    </label>
</template>

<script lang="ts">
	import {Component, Vue, Prop, Watch} from 'annotation';

	@Component
	export default class GCheckbox extends Vue {

		@Prop({default: '', required: true})
		private name: string;

		@Prop()
		private value;

		@Prop({default: true})
		private trueValue: any;

		@Prop({default: false})
		private falseValue: any;

		@Prop({default: false})
		private disabled: boolean;

		@Prop({default: false})
		private indeterminate: boolean;

		@Prop()
		private nativeValue: any;

		@Watch('value')
		private onValueChange(value) {
			this.newValue = value;
		}

		@Prop({
			default: ''
		})
		private type: string;

		private newValue: any = this.value;

		private get computedValue() {
			return this.newValue;
		}

		private set computedValue(value) {
			this.newValue = value;
			this.$emit('input', value);
		}

		private get alterClassName() {
			if (this.$parent.isFieldComponent && this.$parent.type.length) {
				return 'is-' + this.$parent.type;
			}

			return '';
        }

		private get className() {
			const {type, alterClassName}: GCheckbox = this;
			const typeClassName = type ? ('is-' + type) : '';

			return [typeClassName, alterClassName].reduce((accu, item)
				=> accu + (item ? (item + ' ') : ''), 'g-checkbox checkbox ');
		}
	}
</script>