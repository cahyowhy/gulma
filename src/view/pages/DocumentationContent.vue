<!--suppress ALL -->
<template>
    <div class="columns">
        <div class="column side-navigation">
            <ul class="menu-list">
                <li v-for="menu in menuSection" :key="menu.name">
                    <a class="is-title">
                        {{menu.name}}
                    </a>
                    <ul v-if="menu.childrens.length">
                        <li v-for="children in menu.childrens" :key="children.name">
                            <g-link v-if="children.url" :to="children.url">{{children.name}}</g-link>
                            <a v-else class="semi-title">{{children.name}}</a>

                            <ul v-if="children.childrens && children.childrens.length">
                                <li v-for="grandchildren in children.childrens" :key="grandchildren.name">
                                    <g-link :to="grandchildren.url">{{grandchildren.name}}</g-link>
                                </li>
                            </ul>
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
				name: 'Installation',
				childrens: [{name: 'Getting started', url: '/documentation/start'}, {
					name: 'Customization',
					url: '/documentation/customization'
				}]
			},
			{
				name: 'Components',
				childrens: [
					{
						name: 'Form', childrens: [
							{name: 'Field', url: '/documentation/form-field'},
							{name: 'Input', url: '/documentation/form-input'},
							{name: 'Select', url: '/documentation/form-select'},
							{name: 'Checkbox', url: '/documentation/form-checkbox'},
							{name: 'Button', url: '/documentation/form-button'}
						]
					},
					{name: 'Table', url: '/documentation/table'},
					{name: 'Tab', url: '/documentation/tab'},
					{name: 'Breadcrumb', url: '/documentation/breadcrumb'},
				]
			}
		];
	}
</script>

<style lang="scss">
    @import "../../style/variable";

    .side-navigation {
        background-color: $grey-darker;
        border-radius: 5px;
        a {
            color: white !important;
            &[href*="/"]:hover {
                background-color: transparent;
                color: $warning !important;
                font-weight: bold;
            }
        }
        a.semi-title, a.is-title {
            font-weight: bold;
            cursor: auto;
            &:hover {
                background-color: transparent;
            }
        }
        a.is-title {
            font-size: 1.2rem;
        }
        .wrapper-c, .wrapper-c a {
            width: 100%;
        }
    }

    .columns {
        margin: 0 !important;
        padding-top: 2rem;
    }
</style>