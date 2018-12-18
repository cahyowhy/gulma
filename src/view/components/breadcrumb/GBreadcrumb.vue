<!--suppress ALL -->
<template>
    <nav :class="className">
        <ul>
            <li v-for="(link, index) in links" :key="`link-${index}`">
                <g-link :to="link.to">{{link.name}}</g-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
	import {Component, Vue, Prop} from 'annotation';
	import GLink from '../link/GLink';

	@Component({components: {GLink}})
	export default class GBreadcrumb extends Vue {

		@Prop({default: []})
		private links: Array<any>;

		@Prop({default: ''})
		private position: string;

		@Prop({default: ''})
		private size: string;

		@Prop({default: ''})
		private separator: string;

		private get className() {
			const {position, size, separator} = this;
			const positionClassName = position ? ('is-' + position) : '';
			const sizeClassName = size ? ('is-' + size) : '';
			const separatorClassName = separator ? ('has-' + separator + '-separator') : '';

			return [positionClassName, sizeClassName, separatorClassName]
				.reduce((accu, item) => accu + (item ? (item + ' ') : ''), 'breadcrumb g-breadcrumb');
		}
	}
</script>