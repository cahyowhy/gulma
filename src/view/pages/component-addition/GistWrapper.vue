<!--suppress ALL -->
<template>
    <div :class="`gist-wrapper ${isHorizontal ? 'is-horizontal' : ''}`">
        <p class="title is-5" v-if="title">{{title}}</p>
        <div v-if="$slots.content" class="content">
            <slot name="content"></slot>
        </div>
        <div class="gist-wrp-inner">
            <div class="components-wrp sec">
                <slot></slot>
            </div>
            <div class="gist-inner sec" :class="isOpened ? 'is-opened': ''">
                <vue-gist :gistId="gistId" :file="file"></vue-gist>
                <div class="gist-overlayed has-text-centered">
                    <a @click="isOpened = !isOpened" class="button is-dark has-icon">
                        <span>{{buttonTitle}}</span>
                        <span class="icon">
                            <i :class="buttonClassName"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
	import {Component, Vue, Prop} from "annotation";

	@Component
	export default class GistWrapper extends Vue {

		@Prop()
		private gistId: string;

		@Prop()
		private file: string;

		@Prop()
		private title: string;

		@Prop({default: false})
		private isOpened: boolean;

		@Prop({default: false})
		private isHorizontal: boolean;

		private get buttonTitle() {
			const {isHorizontal, isOpened} = this;

			return isOpened ? (isHorizontal ? 'Hide' : 'Close') : (isHorizontal ? 'Show' : 'Open');
		}

		private get buttonClassName() {
			const {isHorizontal, isOpened} = this;

			return 'fas fa-' + (isOpened ? (isHorizontal ? 'eye-slash' : 'chevron-up') :
				(isHorizontal ? 'eye' : 'chevron-down'));
		}
	}
</script>

<style lang="scss">
    @import "../../../style/variable";

    .gist-wrapper {
        padding: 1.5rem 1rem;
        border-top: 1px solid $grey-lighter;
        border-bottom: 1px solid $grey-lighter;
        .gist-inner {
            position: relative;
            height: 200px;
            overflow: hidden;
            .gist-overlayed {
                bottom: 0;
                position: absolute;
                width: 100%;
                box-shadow: 0px -5px 5px $white-ter;
                border: 1px solid $grey-lighter;
                background-color: white;
                padding: .75rem 0;
                border-top: none;
            }
            &.is-opened {
                height: auto;
                overflow: auto;
                .gist-overlayed {
                    margin-top: -1.05rem;
                    position: relative;
                    box-shadow: none;
                }
            }
        }
        .sec:not(:last-child) {
            margin-bottom: 1.5rem;
        }
        &.is-horizontal .gist-wrp-inner {
            display: flex;
            flex-direction: row;
            .sec {
                flex: 1;
                &:first-child {
                    padding-right: .75rem;
                }
                &:last-child {
                    padding-left: .75rem;
                }
            }
            .gist-inner {
                height: auto;
                .gist-overlayed {
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, .7);
                    > a.button {
                        top: 50%;
                        transform: translateY(-50%);
                    }

                }
                &.is-opened {
                    .gist-overlayed {
                        height: auto;
                        > a.button {
                            top: inherit;
                            transform: inherit;
                        }
                    }
                }
            }
        }
    }
</style>