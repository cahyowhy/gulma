<!--suppress ALL -->
<template>
    <div class="g-tab">
        <div :class="className">
            <ul>
                <li v-for="(link, index) in links" :key="`tab-item-${index}`"
                    :class="(useAsLink ? matchUrlQuery(link.to) : currentTab === index) ? 'is-active' : ''">
                    <template v-if="useAsLink">
                        <g-link :to="link.to" @click.native="onMoveTab(index)">
                            <div v-if="customTabItem" class="wrapper-c">
                                <slot :name="`tab-item-${index}`" :active="currentTab === index"></slot>
                            </div>
                            <span v-else>{{link.name}}</span>
                        </g-link>
                    </template>
                    <a v-else @click="onMoveTab(index)">{{link.name}}</a>
                </li>
            </ul>
        </div>
        <div class="tab-content">
            <div class="tab-content-item" v-for="(link, index) in links" :key="`tab-${index}`">
                <div v-if="useAsLink ? matchUrlQuery(link.to) : currentTab === index" class="tab-content-iner">
                    <slot :name="`tab-content-${index}`" :active="currentTab === index"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Mixin} from 'annotation';
    import GLink from '../link/GLink';
    import {cloneArray} from '../../../util/Underscore';
    import QueryString from '../../../util/QueryString';

    const SIZE = ['small', 'medium', 'large', ''];
    const POSITION = ['centered', '', 'right'];

    @Component({
        components: {GLink}
    })
    export default class GTab extends Mixin(QueryString) {

        @Prop({default: [], required: true})
        private links: Array<any>;

        @Prop({default: false})
        private customTabItem: boolean;

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

        private onMoveTab(index) {
            this.currentTab = index;
            this.$emit('change', index);
        }
    }
</script>