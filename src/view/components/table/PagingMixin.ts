import {Component, Prop, Vue} from "annotation";

@Component
export default class PagingMixin extends Vue {
	
	@Prop({default: 0})
	public perPage: number;
	
	@Prop({default: false})
	public frontEndPagination: boolean;
	
	@Prop({default: false})
	public usePaging: boolean;
	
	@Prop({default: 1})
	public totalData: number;
	
	public currentPage: number = 1;
	
	public get maxPage() {
		return Math.ceil(this.totalData / this.perPage);
	};
	
	public get paginations() {
		const {usePaging, currentPage, maxPage} = this;
		
		if (usePaging) {
			return this.countPagination(currentPage, maxPage);
		}
		
		return [];
	}
	
	public onChangePage({value, isDisable}: any) {
		if (!isDisable && value) {
			this.currentPage = value;
			this.$emit('changePage', value)
		}
	}
	
	public countPagination(current: any, max: any) {
		if (max <= 8) {
			let currentPage = this.currentPage;
			
			return new Array(max).fill(null).map((_, i) => {
				const value = i + 1;
				let btnClassName = 'pagination-link';
				if (currentPage === value) {
					btnClassName += ' is-current';
				}
				
				return {
					value,
					btnClassName,
					isDisable: false
				}
			});
		} else {
			let delta = 2, range = [], rangeWithDots = [], l;
			let currentPage = this.currentPage;
			
			range.push(1);
			for (let i = current - delta; i <= current + delta; i++) {
				if (i < max && i > 1) {
					range.push(i)
				}
			}
			range.push(max);
			
			for (let i of range) {
				if (l) {
					if (i - l === 2) {
						rangeWithDots.push(l + 1)
					} else if (i - l !== 1) {
						rangeWithDots.push('...')
					}
				}
				
				rangeWithDots.push(i);
				l = i
			}
			
			return rangeWithDots.map((item) => {
				let btnClassName = `pagination-${item === '...' ? 'ellipsis' : 'link'}`
				if (currentPage === item) btnClassName += ' is-current'
				
				return {
					value: item,
					btnClassName,
					isDisable: item === '...'
				}
			})
		}
	}
}