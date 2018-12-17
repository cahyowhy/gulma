<!--suppress ALL -->
<template>
    <div class="field" :class="className">
        <g-fieldlabel v-if="label" :size="size" :isHorizontal="isHorizontal">{{label}}</g-fieldlabel>
        <g-fieldbody v-if="isHorizontal" :isNarrow="isNarrow"
                     :message="message" :type="type" :size="size" :position="position">
            <slot></slot>
        </g-fieldbody>
        <slot v-else></slot>
        <p v-if="message && !isHorizontal" class="help" :class="type ? ('is-'+type) : ''">{{message}}</p>
    </div>
</template>

<script lang="ts">
	import {Component, Mixin, Prop} from "annotation";
	import FormPropMixins from '../../../util/FormPropMixins';
	import GFieldlabel from './GFieldlabel';
	import GFieldbody from './GFieldbody';

	@Component({components: {'g-fieldlabel': GFieldlabel, 'g-fieldbody': GFieldbody}})
	export default class GField extends Mixin(FormPropMixins) {

		@Prop({default: ''})
		public label: string;

		@Prop({default: ''})
		public message: string;

		@Prop({default: false})
		public hasAddons: boolean;

		@Prop({default: false})
		public isHorizontal: boolean;

		@Prop({default: false})
		public isGrouped: boolean;

		@Prop({default: false})
		public isNarrow: boolean;

		@Prop({default: false})
		public isGroupedMultiline: boolean;

		public isFieldComponent: boolean = true;

		public get className() {
			const {isGrouped, isGroupedMultiline, position, hasAddons, isHorizontal} = this;
			const applyPosition = position && (hasAddons || isGrouped);
			const positionClassName = applyPosition ?
				(hasAddons ? ('has-addons-' + position) : isGrouped ? ('is-grouped-' + position) : '') : '';
			const className = {
				'is-grouped': isGrouped, 'is-horizontal': isHorizontal,
				'has-addons': hasAddons, 'is-grouped-multiline': isGrouped && isGroupedMultiline
			};
			className[positionClassName] = applyPosition;

			return className;
		}
	}
</script>