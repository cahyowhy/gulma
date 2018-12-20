<!--suppress ALL -->
<template>
    <th :class="sorting ? 'has-pointer' : ''"
        :style="width ? `width:${width}px` : false">
        <div class="inner-th" :class="position ? `has-text-${position}` : ''">
            <a @click="onSorting">
                <span><slot></slot></span>
                <span v-if="currentSorting == thIndex" :class="`icon-arrow ${isSortAscending ? '' : 'is-up'}`"></span>
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

		@Prop({type: String})
		private position: string;

		@Prop({type: String})
		private thKey: string;

		@Prop([String, Number])
		private width!: string | number;

		@Prop([String, Number])
		private thIndex!: string | number;

		private get currentSorting() {
			if (this.$parent.isTableComponent) {
				return this.$parent.currentSorting;
			}

			return null;
		}

		private get isSortAscending() {
			if (this.$parent.isTableComponent) {
				return this.$parent.isSortAscending || false;
			}

			return false;
		}

		private onSorting() {
			if (this.$parent.isTableComponent && this.sorting && this.thKey) {
				this.$parent.onSortBy(this.thIndex, this.thKey);
			}
		}
	}
</script>