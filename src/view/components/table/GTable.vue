<!--suppress ALL -->
<template>
    <div class="g-table">
        <div v-if="isLoading" class="loading-animation">
            <i class="fas fa-spinner fa-6x fa-spin"></i>
        </div>
        <table class="table" :class="classNames">
            <thead :class="headerClassName">
            <slot name="thead" v-if="$scopedSlots.thead || $slots.thead" :currentSorting="currentSorting"
                  :colSpan="colSpan" :sortFn="onSortBy" :isSortAscending="isSortAscending"/>
            <tr v-else>
                <th v-if="showNumbering">
                    <div class="inner-th has-text-centered">
                        <a>
                            <span>No</span>
                        </a>
                    </div>
                </th>
                <template v-for="(column, index) in columns">
                    <g-table-column-head :sorting="column.sorting && currentSorting === index"
                                         :width="column.width" :position="column.position"
                                         :isSortAscending="isSortAscending"
                                         @click="() => column.sorting ? onSortBy(index, column.key) : null">
                        <span>{{column.name}}</span>
                    </g-table-column-head>
                </template>
            </tr>
            </thead>
            <tbody>
            <template v-for="(data, index) in datasCloned">
                <tr>
                    <td v-if="showNumbering" class="has-text-centered is-number" data-label="No.">
                        <span>{{index+1}}</span>
                    </td>
                    <slot v-if="$scopedSlots.default || $slots.default" :data="data" :index="index" :currentPage="currentPage"/>
                    <template v-else v-for="(value, key, indexChild) in data">
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
                                <slot name="detail" :data="data" :index="index" :currentPage="currentPage"></slot>
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
        <div v-if="usePaging" class="level">
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
	import {cloneArray} from '../../../util/Underscore';
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
		private success: boolean;
		
		@Prop({default: false})
		private info: boolean;
		
		@Prop({default: false})
		private warning: boolean;
		
		@Prop({default: false})
		private danger: boolean;
		
		@Prop({default: false})
		private fullWidth: boolean;
		
		@Prop({default: false})
		private hoverable: boolean;
		
		@Prop({default: true})
		private responsiveTable: boolean;
		
		@Prop({default: [], required: true})
		private columns: Array<string>;
		
		@Prop({default: true})
		private showNumbering: boolean;
		
		@Prop({default: false})
		private isLoading: boolean;
		
		@Prop({default: []})
		private datas: Array<any>;
		
		private datasCloned: Array<any> = [];
		
		private currentSorting: any = null;
		
		private isSortAscending: boolean = true;

		private detailsOpened: Array<boolean> = [];

		private forceRenderDetail: boolean = true;

		private get computeDatasWithCurrentPage() {
			return [this.datas, this.currentPage];
        }
		
		@Watch('computeDatasWithCurrentPage', {immediate: true})
		private onDatasChange([datas, currentPage]) {
			let datasFinals = Array.isArray(datas) ? datas : [];
			if (this.frontEndPagination && this.perPage && this.usePaging) {
				const start = (currentPage - 1) * this.perPage;
				datasFinals = datasFinals.slice(start, (start + this.perPage));
			}

			this.datasCloned = datasFinals;
			this.detailsOpened = new Array<boolean>((this.datasCloned || []).length).fill(false);
		}
		
		private get colSpan() {
			return this.columns.length + (this.showNumbering ? 1 : 0);
		}
		
		private get classNames() {
			const {bordered, striped, narrow, fullWidth, hoverable, responsiveTable} = this;
			
			return {
				'is-narrow': narrow,
				'is-striped': striped,
				'is-bordered': bordered,
				'is-fullwidth': fullWidth,
				'is-hoverable': hoverable,
				'has-responsive-table': responsiveTable
			}
		}
		
		private get headerClassName() {
			const {info, warning, danger, success} = this;
			
			return {
				'is-info': info,
				'is-warning': warning,
				'is-danger': danger,
				'is-success': success
			}
		}

		private expandDetail(index) {
			this.forceRenderDetail = false;
			this.detailsOpened[index] = !this.detailsOpened[index];
			this.$nextTick(() => this.forceRenderDetail = true);
		}
		
		private onSortBy(index: number, key: string) {
			if (key && this.datasCloned[0][key]) {
				this.isSortAscending = this.currentSorting === index ? !this.isSortAscending : true;
				this.currentSorting = index;
				
				this.datasCloned = this.datasCloned.sort((a, b) => {
					if (typeof a[key] === 'string') {
						return this.isSortAscending ? (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) :
							(a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0);
					}
					
					return this.isSortAscending ? a[key] - b[key] : b[key] - a[key];
				});
			}
		}
	}
</script>