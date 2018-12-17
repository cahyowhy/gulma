<!--suppress ALL -->
<template>
    <div class="columns">
        <div class="column side-navigation box">
            <ul class="menu-list">
                <li v-for="menu in menuSection" :key="menu.name">
                    <a class="is-title">
                        {{menu.name}}
                    </a>
                    <ul v-if="menu.childrens.length">
                        <li v-for="children in menu.childrens" :key="children.name">
                            <g-link :to="children.url">{{children.name}}</g-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="column is-three-quarters">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "annotation";

    @Component
    export default class DocumentationContent extends Vue {

    	private menuSection: any = [
		    {
			    name: 'Installation', active: true,
			    childrens: [{name: 'Getting started', url: '/start'}, {name: 'Customization', url: '/customization'}]
		    },
		    {
			    name: 'Components', active: false,
			    childrens: [
				    {name: 'Table', url: '/table'},
				    {name: 'Tab', url: '/tab'},
				    {name: 'Checkbox', url: '/checkbox'},
				    {name: 'Button', url: '/button'},
				    {name: 'Breadcrumb', url: '/breadcrumb'},
			    ]
		    }
	    ];
    }
</script>

<style lang="scss">
    @import "../../style/variable";

    .side-navigation {
        background-color: $white-ter;
        a.is-title {
            font-weight: bold;
        }
        .wrapper-c, .wrapper-c a {
            width: 100%;
        }
    }

    .columns {
        margin: 0;
        padding-top: 2rem;
    }
</style>