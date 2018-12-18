<!--suppress ALL -->
<template>
    <div class="page-container">
        <div v-if="links.length" class="breadcrumb-wrp">
            <g-breadcrumb :links="links"/>
        </div>
        <div class="title-wrp">
            <h1 class="title is-3">{{title}}</h1>
            <p v-if="subtitle" class="title is-5">{{subtitle}}</p>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
	import {Component, Vue, Prop} from "annotation";

	@Component
	export default class PageContainer extends Vue {

		@Prop({default: ''})
		private title: string;

		@Prop({default: ''})
		private subtitle: string;

		@Prop({default: []})
		private links: Array<any>;
	}
</script>

<style lang="scss">
    @import "../../../style/variable";

    .page-container {
        padding: .75rem;
        .breadcrumb-wrp {
            margin-bottom: 1rem;
        }
        .g-breadcrumb {
            a {
                color: $grey-darker;
                &.router-link-exact-active {
                    color: $link;
                }
            }
        }
        .title-wrp {
            h1 {
                margin-bottom: .5rem;
            }
            p {
                margin-bottom: 0;
                font-weight: 400;
                color: $grey-dark;
            }
            margin-bottom: 1.5rem;
        }
    }
</style>