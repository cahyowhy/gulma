<!--suppress ALL -->
<template>
    <div class="index-page">
        <section class="hero">
            <div class="hero-body">
                <div class="level">
                    <div class="level-left">
                        <div class="bg-banner"></div>
                    </div>
                    <div class="level-right">
                        <div class="content">
                            <h1 class="title is-1">Gulma</h1>
                            <p>Vue component based on Bulma CSS. <strong>Easy to use</strong>,
                                <strong>Lightweight</strong> and <strong>Reusable</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, MetaTag, Vue} from "annotation";
    import DefaultMeta from '../../util/DefaultMeta';

    @Component
    export default class Index extends Vue {

        @MetaTag
        private info() {
            return DefaultMeta();
        }

        private links: Array<any> = [{name: 'index', to: '/'}, {name: 'about', to: '/?about=true'}];

        private checkBoxCheck: string = 'Oke';

        private checkBoxDef: boolean = false;

        private mounted() {
            let animFrames = 100;
            let animate = true;

            const mouseMove = function (e) {
                let bRect = this.getBoundingClientRect();
                let mX = e.pageX;
                let mY = e.pageY;
                let pX = Math.floor((mX - bRect.left) / bRect.width * 100);
                let pY = Math.floor((mY - bRect.top) / bRect.height * 100);
                let rotX = (pY - 50) / 5;
                let rotY = -(pX - 50) / 5;
                let shd = `0 ${rotX}px ${Math.abs(rotX) * 5}px rgba(0,0,50,.15), 0 ${pY / 10}px ${pY / 5}px rgba(0,0,0,.25)`;
                let trs = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

                window.$('.bg-banner').css('box-shadow', shd);
                window.$('.bg-banner').css('transform', trs);
            }

            const mouseLeave = function () {
                window.$('.bg-banner').css('box-shadow', '');
                window.$('.bg-banner').css('transform', '');
            }

            window.$('.bg-banner').on('mouseenter', () => {
                animate = false
            });
            window.$('.bg-banner').on('mousemove', mouseMove);
            window.$('.bg-banner').on('mouseleave', mouseLeave);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/variable";

    .index-page {
        section.hero {
            .bg-banner {
                cursor: pointer;
                background-image: url("/assets/images/banner.png");
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                width: 350px;
                height: 201px;
                border-radius: 6px;
            }
            .level-left {
                padding: 1.5rem;
            }
            .level-right {
                flex: 1;
                justify-content: flex-start;
                .content {
                    h1 {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>