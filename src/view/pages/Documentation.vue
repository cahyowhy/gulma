<!--suppress ALL -->
<template>
    <div class="documentation-page">
        <router-view></router-view>
        <checks/>
    </div>
</template>

<script lang="ts">
	import {Component, MetaTag, Vue} from "annotation";
	import Checks from './Checks';

	@Component({components: {'checks': Checks}})
	export default class Documentation extends Vue {

	}
</script>