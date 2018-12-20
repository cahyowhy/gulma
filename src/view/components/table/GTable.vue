<!--suppress ALL -->
<template>
    <div class="g-table">
        <div v-if="isLoading" class="loading-animation">
            <i class="fas fa-spinner fa-6x fa-spin"></i>
        </div>
        <table class="table" :class="classNames">
            <thead :class="headerClassName">
            <slot name="thead" v-if="$scopedSlots.thead || $slots.thead"
                  :colSpan="colSpan"/>
            <tr v-else>
                <th v-if="showNumbering">
                    <div class="inner-th has-text-centered">
                        <a>
                            <span>No</span>
                        </a>
                    </div>
                </th>
                <template v-for="(column, index) in columns">
                    <g-table-column-head :sorting="column.sorting" :th-index="index" :width="column.width"
                                         :position="column.position" :th-key="column.key">
                        {{column.name}}
                    </g-table-column-head>
                </template>
            </tr>
            </thead>
            <tbody>
            <template v-for="(data, index) in datasCloned.filter(item => item.visible)">
                <tr>
                    <td v-if="showNumbering" class="has-text-centered is-number" data-label="No.">
                        <span>{{indexNumbering(index + 1)}}</span>
                    </td>
                    <slot v-if="$scopedSlots.default || $slots.default" :data="omitProperties(data)"
                          :index="datasCloned[indexNumbering(index, true)].index" :currentPage="currentPage"/>
                    <template v-else v-for="(value, key, indexChild) in omitProperties(data)">
                        <g-table-column :label="columns[indexChild].name" :isSortAscending="isSortAscending"
                                        :position="columns[indexChild] && columns[indexChild].position">
                            <span>{{value}}</span>
                        </g-table-column>
                    </template>
                </tr>
                <tr v-if="$scopedSlots.detail || $slots.detail">
                    <td v-if="forceRenderDetail" :colspan="colSpan" class="td-detail">
                        <div :class="`td-detail-wrapper ${detailsOpened[index] ? '' : 'is-narrowed'}`">
                            <a class="button is-small is-info" @click="expandDetail(index)">
                                <i :class="`icon-chevron ${detailsOpened[index] ? '' : 'is-up'}`"></i>
                            </a>
                            <div class="slot-wrp">
                                <slot name="detail" :index="datasCloned[indexNumbering(index, true)].index"
                                      :currentPage="currentPage" :data="omitProperties(data)"/>
                            </div>
                        </div>
                    </td>
                </tr>
            </template>
            <template v-if="!datasCloned.length">
                <tr v-if="$slots.empty">
                    <td :colspan="colSpan" class="data-empty">
                        <slot name="empty"></slot>
                    </td>
                </tr>
                <tr v-else>
                    <td :colspan="colSpan" class="has-text-centered data-empty">
                        No Data displayed
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
        <div v-if="usePaging && datasCloned.length" class="level">
            <div class="level-left"></div>
            <div class="level-right">
                <nav class="pagination">
                    <ul class="pagination-list">
                        <li class="paging-has-icon le" v-if="currentPage > 1">
                            <a class="pagination-link"
                               @click="onChangePage(paginations.find(({value}) => value === currentPage - 1))">
                                <span class="icon_chevron_v is-left"></span>
                            </a>
                        </li>
                        <li v-for="(page, index) in paginations" :key="`pagination-${index}`">
                            <a :class="page.btnClassName"
                               @click="onChangePage(page)">
                                {{page.value}}
                            </a>
                        </li>
                        <li class="paging-has-icon ri" v-if="currentPage < maxPage">
                            <a class="pagination-link"
                               @click="onChangePage(paginations.find(({value}) => value === currentPage + 1))">
                                <span class="icon_chevron_v"></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
	import {Component, Prop, Mixin, Watch} from "annotation";
	import {cloneArray, omit} from '../../../util/Underscore';
	import PagingMixin from './PagingMixin';
	import GTableColumnHead from './GTableColumnHead';
	import GTableColumn from './GTableColumn';

	@Component({
		components: {
			'g-table-column-head': GTableColumnHead,
			'g-table-column': GTableColumn,
		}
	})
	export default class GTable extends Mixin(PagingMixin) {
		
		@Prop({default: false})
		private bordered: boolean;
		
		@Prop({default: false})
		private striped: boolean;
		
		@Prop({default: false})
		private narrow: boolean;
		
		@Prop({default: false})
		private isFullwidth: boolean;
		
		@Prop({default: false})
		private hoverable: boolean;
		
		@Prop({default: true})
		private responsiveTable: boolean;
		
		@Prop({default: []})
		private columns: Array<string>;
		
		@Prop({default: false})
		private showNumbering: boolean;
		
		@Prop({default: false})
		private isLoading: boolean;
		
		@Prop({default: []})
		private datas: Array<any>;

		@Prop({default: ''})
		private type: string;
		
		private datasCloned: Array<any> = [];

		private currentSorting: any = null;
		
		private isSortAscending: boolean = true;

		private detailsOpened: Array<boolean> = [];

		private forceRenderDetail: boolean = true;

		private isTableComponent: boolean = true;

		@Watch('datas', {immediate: true})
		private onDataChange(datas) {
			this.datasCloned = datas.map((item, index) => {
				item.index = index;
				item.visible = this.usePaging ? (index < this.perPage) : true;

				return item;
			});

			this.detailsOpened = new Array<boolean>((this.datasCloned || []).length).fill(false);
		}

		@Watch('currentPage')
		private onPageHasChange() {
			this.applyPagination();
			this.reRenderDetail();
		}

		private applyPagination() {
			const {start, end} = this.pageRange;
			const {frontEndPagination, perPage, usePaging} = this;

			if (frontEndPagination && perPage && usePaging) {
				this.datasCloned.map((item, index) => {
					item.visible = index >= start && index < end;

					return item;
				});
			}
		}

		private reRenderDetail() {
			if (this.$scopedSlots.detail || this.$slots.detail) {
				this.forceRenderDetail = false;
				this.detailsOpened = this.detailsOpened.map((item) => {
					item = false;

					return item;
				});

				this.$nextTick(() => this.forceRenderDetail = true);
			}
		}

		private get pageRange() {
			const {perPage, currentPage} = this;
			const start = (currentPage - 1) * perPage;
			const end = start + perPage;

			return {start, end};
		}
		
		private get colSpan() {
			return this.columns.length + (this.showNumbering ? 1 : 0);
		}
		
		private get classNames() {
			const {bordered, striped, narrow, isFullwidth, hoverable, responsiveTable} = this;
			
			return {
				'is-narrow': narrow, 'is-striped': striped,
				'is-bordered': bordered, 'is-fullwidth': isFullwidth,
				'is-hoverable': hoverable, 'has-responsive-table': responsiveTable
			}
		}
		
		private get headerClassName() {
			return this.type ? ('is-' + this.type) : '';
		}

		private expandDetail(index) {
			this.detailsOpened[index] = !this.detailsOpened[index];
			this.forceRenderDetail = false;
			this.$nextTick(() => this.forceRenderDetail = true);
		}

		private indexNumbering(index, isFindProps: boolean = false) {
			const pagingIndex = ((this.currentPage - 1) * this.perPage) + index;

			return isFindProps ? (this.frontEndPagination ? pagingIndex : index) :
				this.usePaging ? pagingIndex : index;
		}
		
		private onSortBy(index: number, key: string) {
			const hasListener = this.$listeners && this.$listeners.sort;
			this.isSortAscending = this.currentSorting === index ? !this.isSortAscending : true;
			this.currentSorting = index;

			if (key && this.datasCloned[0] && this.datasCloned[0][key] && !hasListener) {
				const {start, end} = this.pageRange;
				const sortFn = (a, b) => {
					if (typeof a[key] === 'string') {
						return this.isSortAscending ? (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) :
							(a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0);
					}

					return this.isSortAscending ? a[key] - b[key] : b[key] - a[key];
				};

				this.datasCloned = this.datasCloned.sort(sortFn);
				this.applyPagination();
				this.reRenderDetail();
			}

			this.$emit('sort', (this.isSortAscending ? 'asc' : 'desc'), key);
		}

		private omitProperties(data: any = {}) {
			return omit(data, ['index', 'visible']);
		}
	}
</script>