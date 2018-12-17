<!--suppress ALL -->
<template>
    <div class="documentation-page">
        <checks></checks>
    </div>
</template>

<script lang="ts">
	import {Component, Vue} from "annotation";
	import DocumentationContent from './DocumentationContent';
	import Checks from './Checks';

	@Component({components: {'documentation-content': DocumentationContent, 'checks': Checks}})
	export default class Documentation extends Vue {

	}
</script>