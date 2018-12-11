<!--suppress ALL -->
<template>
    <div class="wrapper-c">
        <router-link v-if="hasVueRouter" :to="to" :target="targetBlank ? '_blank' : '_self'">
            <slot></slot>
        </router-link>
        <a v-else :href="to" :target="targetBlank ? '_blank' : '_self'">
            <slot></slot>
        </a>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "annotation";

    @Component
    export default class GLink extends Vue {

        @Prop({default: '/', required: true})
        private to: string;

        @Prop({default: false})
        private targetBlank: boolean;

        private get hasVueRouter() {
            return this.$router !== undefined && this.$router !== undefined;
        }
    }
</script>