<!--suppress ALL -->
<template>
    <td :data-label="label" :class="position ? `has-text-${position}` : ''">
        <slot></slot>
    </td>
</template>

<script lang="ts">
	import {Component, Vue, Prop} from 'annotation';

	@Component
	export default class GTableColumn extends Vue {

		@Prop({required: true})
		private label: string;

		@Prop()
		private position: string;
	}
</script>