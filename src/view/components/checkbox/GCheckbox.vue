<!--suppress ALL -->
<template>
    <label :class="className" :disabled="disabled">
        <input v-model="computedValue" :disabled="disabled" :name="name"
               :indeterminate.prop="indeterminate" type="checkbox" :value="nativeValue"
               :true-value="trueValue"
               :false-value="falseValue">
        <span class="checked"></span>
        <span class="control"><slot/></span>
    </label>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'annotation';

    const TYPE = ['info', 'success', 'warning', 'danger', ''];

    @Component
    export default class GCheckbox extends Vue {

        @Prop({default: '', required: true})
        private name: string;

        @Prop()
        private value: any;

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
            default: '',
            validator: (val) => TYPE.indexOf(val) !== -1
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

        private get className() {
            const {type}: GCheckbox = this;
            const typeClassName = type ? ('is-' + type) : '';

            return [typeClassName].reduce((accu, item) => accu + (item ? (item + ' ') : ''), 'g-checkbox checkbox ');
        }
    }
</script>