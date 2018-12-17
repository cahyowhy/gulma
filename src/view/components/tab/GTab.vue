<!--suppress ALL -->
<template>
    <div class="g-tab">
        <div :class="className">
            <ul>
                <li v-for="(link, index) in links" :key="`tab-item-${index}`"
                    :class="(useAsLink ? matchUrlQuery(link.to) : (currentTab === index)) ? 'is-active' : ''">
                    <template v-if="useAsLink">
                        <g-link :to="link.to" @click.native="onMoveTab(index)">
                            <div v-if="$scopedSlots['tab-item'] || $slots['tab-item']" class="wrapper-c">
                                <slot name="tab-item" :link="link" :index="index"></slot>
                            </div>
                            <span v-else>{{link.name}}</span>
                        </g-link>
                    </template>
                    <a v-else @click="onMoveTab(index)">{{link.name}}</a>
                </li>
            </ul>
        </div>
        <div class="tab-content" ref="tabContent">
            <slot :index="index" :active="active"></slot>
        </div>
    </div>
</template>

<script lang="ts">
	import {Component, Prop, Mixin} from 'annotation';
	import GLink from '../link/GLink';
	import QueryString from '../../../util/QueryString';

	const SIZE = ['small', 'medium', 'large', ''];
	const POSITION = ['centered', '', 'right'];

	@Component({
		components: {GLink}
	})
	export default class GTab extends Mixin(QueryString) {

		@Prop({default: [], required: true})
		private links: Array<any>;

		@Prop({
			default: '',
			validator: (val) => POSITION.indexOf(val) !== -1
		})
		private position: string;

		@Prop({
			default: '',
			validator: (val) => SIZE.indexOf(val) !== -1

		})
		private size: string;

		private currentTab: number = 0;

		private get useAsLink() {
			if (this.links.length) {
				return this.links[0].to ? true : false;
			}

			return false;
		}

		private get className() {
			const {position, size} = this;
			const positionClassName = position ? ('is-' + position) : '';
			const sizeClassName = size ? ('is-' + size) : '';

			return [positionClassName, sizeClassName].reduce((accu, item) =>
				accu + (item ? (item + ' ') : ''), 'tabs ');
		}

		private mounted() {
            const currentIndex = this.links.findIndex(link => this.matchUrlQuery(link.to)) || 0;
			this.hideSomeTab(this.useAsLink ? currentIndex : 0);
		}

		private onMoveTab(index) {
			this.currentTab = index;
			this.$emit('change', index);

			this.hideSomeTab(index);
		}

		private hideSomeTab(index) {
			Array.from(this.$refs.tabContent && this.$refs.tabContent.children).forEach((item, idxChild) => {
				if (item instanceof Node) {
					if (idxChild === index) {
						item.classList.remove('is-hidden');
					} else {
						item.classList.add('is-hidden');
					}
				}
			});
		}
	}
</script>