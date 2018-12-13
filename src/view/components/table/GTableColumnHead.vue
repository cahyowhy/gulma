<!--suppress ALL -->
<template>
    <th :class="sorting ? 'has-pointer' : ''"
        :style="width ? `width:${width}px` : false">
        <div class="inner-th" :class="position ? `has-text-${position}` : ''">
            <a @click="$emit('click')">
                <slot></slot>
                <span v-if="sorting" :class="`icon-arrow ${isSortAscending ? '' : 'is-up'}`"></span>
            </a>
        </div>
    </th>
</template>

<script lang="ts">
	import {Component, Vue, Prop} from 'annotation';

	@Component
	export default class GTableColumnHead extends Vue {

		@Prop({default: false})
		private sorting: boolean;

		@Prop({default: true})
		private isSortAscending: boolean;

		@Prop()
		private position: string;

		@Prop()
		private width: string;
	}
</script>