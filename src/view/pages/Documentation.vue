<!--suppress ALL -->
<template>
    <div class="documentation-page">
        <documentation-content>
            <router-view></router-view>
        </documentation-content>
        <!--<checks></checks>-->
    </div>
</template>

<script lang="ts">
	import {Component, Vue} from "annotation";
	import DocumentationContent from './DocumentationContent';
	import Checks from './Checks';

	@Component({components: {'documentation-content': DocumentationContent, 'checks': Checks}})
	export default class Documentation extends Vue {

		private mounted() {
			window.$('.content-wrapper').addClass('margin-30');
			window.$('nav.navbar .is-fluid').addClass('margin-30');
		}

		private beforeDestroy() {
			window.$('.content-wrapper').removeClass('margin-30');
			window.$('nav.navbar .is-fluid').removeClass('margin-30');
        }
	}
</script>