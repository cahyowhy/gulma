<!--suppress ALL -->
<template>
    <label class="radio g-radio" :class="className">
        <input :value="nativeValue" :name="name" :tabindex="disabled ? false : 0"
               type="radio" :disabled="disabled" v-model="computedValue">
        <span class="checked"></span>
        <span class="control"><slot/></span>
    </label>
</template>

<script lang="ts">
	import {Component, Vue, Prop, Watch} from 'annotation';

	@Component
	export default class GRadiobutton extends Vue {

		@Prop()
		private disabled: boolean;

		@Prop()
		private name: string;

		@Prop({default: ''})
		private type: string;

		@Prop()
		private value;

		@Prop()
		private nativeValue: any;

		@Watch('value')
		private onValueChange(value) {
			this.newValue = value;
		}

		private newValue: any = this.value;

		private get alterClassName() {
			if (this.$parent.isFieldComponent && this.$parent.type.length) {
				return 'is-' + this.$parent.type;
			}

			return '';
		}

		private get className() {
			const {type, alterClassName} = this;

			return [type ? ('is-' + type) : '', alterClassName];
		}

		private get computedValue() {
			return this.newValue;
		}

		private set computedValue(value) {
			this.newValue = value;
			this.$emit('input', value);
		}
	}
</script>