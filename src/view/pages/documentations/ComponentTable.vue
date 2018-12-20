<!--suppress ALL -->
<template>
    <page-container :title="title" :subtitle="subtitle" :links="links">
        <gist-wrapper gist-id="a53bc78401ece19a106ece7a8bc90bd9" file="basictable.vue">
            <template>
                <g-field>
                    <g-checkbox v-model="showNumbering">Apply Numbering</g-checkbox>
                </g-field>
                <g-field>
                    <g-checkbox v-model="bordered">Apply Border to table</g-checkbox>
                </g-field>
                <g-field>
                    <g-checkbox v-model="striped">Apply Strip to table</g-checkbox>
                </g-field>
                <g-field>
                    <g-checkbox v-model="narrow">Apply Narrow to table</g-checkbox>
                </g-field>
                <g-table :datas="userDatas" :columns="userColumns" type="info" :show-numbering="showNumbering"
                         :bordered="bordered" :striped="striped" :narrow="narrow"/>
            </template>
            <template slot="content">
                <p>
                    Example of table with properties with basic <a
                        href="https://bulma.io/documentation/elements/table/">Bulma
                    tables modifier. </a> You can apply numbering with <span class="tag">show-numbering</span>
                    properties.
                </p>
                <div class="notification is-warning">
                    All the data property (object) from datas props will be iterate. So make sure that all attributes of
                    datas are data that will be displayed
                </div>
                <p>You can apply width and text align attributes to the cell by adding <span class="tag">width</span>
                    and <span class="tag">position</span> attribute to the <span class="tag">columns</span> props</p>
                <p>By default the table is responsive. Try to resize your screen at <= 768px</p>
            </template>
        </gist-wrapper>
        <gist-wrapper gist-id="289bfcd90f74f071285e0dec3918bf4d" file="sortingpagingtable.vue"
                      title="Sorting and paging">
            <template>
                <g-table :datas="userDatas2" :columns="userColumns2" type="info"
                         use-paging :total-data="10" :per-page="5" front-end-pagination show-numbering/>
            </template>
            <template slot="content">
                <div class="notification is-info">
                    If you using backend pagination you can implement paging using <span class="tag">@changePage</span>
                    and
                    sorting using <span class="tag">@sort</span>
                </div>
                <p>You can add <span class="tag">sorting</span> to the <span class="tag">columns</span> props to apply
                    sorting. Try to click
                    <span class="tag">thead</span> of <span class="tag">first_name</span> bellow to apply sorting.</p>
                <p>To apply pagination just add props <span class="tag">use-paging</span>, <span
                        class="tag">per-page</span> and <span class="tag">total-data</span>. If the data isn't updated
                    anymore just use props <span class="tag">front-end-pagination</span>
                </p>
            </template>
        </gist-wrapper>
        <gist-wrapper gist-id="360a019bb73fa6b0ffc5714ead764c02" file="customheaderbodytable.vue"
                      title="Custom Header and Body">
            <template>
                <g-table :datas="userDatas3Formated" :columns="userColumns3" type="info" use-paging
                         :total-data="10" :per-page="5" front-end-pagination show-numbering>
                    <template slot="thead" slot-scope="{colSpan}">
                        <tr>
                            <th></th>
                            <th colspan="2">Name</th>
                            <th :colspan="colSpan-3">Aditional info</th>
                        </tr>
                        <tr>
                            <th class="has-text-centered">No.</th>
                            <g-table-column-head v-for="(column, index) in userColumns3" :width="column.width"
                                                 :key="column.key" :sorting="column.sorting" :th-index="index"
                                                 :th-key="column.key" :position="column.position">
                                <span>{{column.name}}</span>
                            </g-table-column-head>
                        </tr>
                    </template>
                    <template slot-scope="{data, index, currentPage}">
                        <g-table-column>
                            <div class="field is-grouped">
                                <div class="image is-32x32 control">
                                    <img :src="userDatas3[index].avatar">
                                </div>
                                <p class="control is-expanded">{{data.first_name}}</p>
                            </div>
                        </g-table-column>
                        <g-table-column>
                            <span>{{data.last_name}}</span>
                        </g-table-column>
                        <g-table-column position="centered">
                            <span>{{data.date}}</span>
                        </g-table-column>
                        <g-table-column>
                            <label class="has-icon">
                                <span class="icon">
                                    <i v-if="data.gender === 'Male'" class="fas fa-mars"></i>
                                    <i v-else class="fas fa-venus"></i>
                                </span>
                                <span>{{data.gender}}</span>
                            </label>
                        </g-table-column>
                    </template>
                </g-table>
            </template>
            <template slot="content">
                <p>
                    You can apply custom header with adding <span class="tag">thead</span> slot.
                    Whereas for implementing a custom body include the default slot
                </p>
            </template>
        </gist-wrapper>
        <gist-wrapper gist-id="d5c87f749e669f40545a9dc66cbd4949" file="detailtable.vue"
                      title="Table detail">
            <template>
                <g-table :datas="userDatas3Formated" :columns="userColumns3" type="info" use-paging
                         :total-data="10" :per-page="5" front-end-pagination show-numbering>
                    <template slot="detail" slot-scope="{index, data}">
                        <div class="content">
                            <div class="field is-grouped">
                                <div class="control image is-64x64">
                                    <img :src="userDatas3[index].avatar" :alt="data.first_name">
                                </div>
                                <div class="control is-expanded">
                                    <p class="title is-6">{{data.first_name}} {{data.last_name}}</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                                    <p class="help">{{data.date}}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </g-table>
            </template>
            <template slot="content">
                <p>
                    You can apply detail for each row of table. By using slot <span class="tag">detail</span>.
                    Just try to hovering each row!..
                </p>
            </template>
        </gist-wrapper>
        <gist-wrapper gist-id="219c51e62bbde3e14d4917deebf2248f" file="asynctable.vue"
                      title="Async data example">
            <template>
                <g-field>
                    <g-checkbox v-model="forceDataEmpty">Force data empty</g-checkbox>
                </g-field>
                <g-table :datas="forceDataEmpty ? []: userDatas4" :columns="userColumns4" type="info"
                         @changePage="doFind" :total-data="100" :per-page="perPage"
                         :isLoading="isLoading" show-numbering use-paging>
                    <template slot="empty">
                        <div class="has-text-centered">
                            <p><i class="fas fa-box-open fa-7x"></i></p>
                            <p class="title is-6">No more data to load</p>
                        </div>
                    </template>
                </g-table>
            </template>
            <template slot="content">
                <p>
                    Example of applying async data on g-table.
                </p>
            </template>
        </gist-wrapper>
        <div class="content-api-wrapper">
            <h2 class="title is-4">API</h2>
            <g-tab :links="tabLinks">
                <g-tab-content>
                    <g-table :datas="apiPropsDatas" :columns="apiPropsColumns" type="info" is-fullwidth>
                        <template slot-scope="{data}">
                            <g-table-column><div class="content" v-html="data.name"></div></g-table-column>
                            <g-table-column><div class="content" v-html="data.description"></div></g-table-column>
                            <g-table-column><div class="content" v-html="data.type"></div></g-table-column>
                            <g-table-column><div class="content" v-html="data.values"></div></g-table-column>
                            <g-table-column><div class="content" v-html="data.defaultValue"></div></g-table-column>
                        </template>
                    </g-table>
                </g-tab-content>
                <g-tab-content>
                    <g-table :datas="apiEventsDatas" :columns="apiEventsColumns" type="info" is-fullwidth>
                        <template slot-scope="{data}">
                            <g-table-column><div class="content" v-html="data.name"></div></g-table-column>
                            <g-table-column><div class="content" v-html="data.description"></div></g-table-column>
                            <g-table-column><div class="content" v-html="data.parameters"></div></g-table-column>
                        </template>
                    </g-table>
                </g-tab-content>
            </g-tab>
        </div>
    </page-container>
</template>

<script lang="ts">
	import axios from 'axios';
	import {Component, Vue, MetaTag, Inject} from "annotation";
	import DefaultMeta from '../../../util/DefaultMeta';
	import ComponentApiProps from '../../../models/ComponentApiProps';
	import ComponentApiEvents from '../../../models/ComponentApiEvents';
	import ComponentApiService from '../../../service/ComponentApiService';
	import {cloneArray, omit} from '../../../util/Underscore'

	const TITLE = 'Gulma | Components | Table';
	const DESCRIPTION = 'Table component. Wrapping tabulated data. Responsive';

	@Component
	export default class ComponentTable extends Vue {

		@MetaTag
		private info() {
			return DefaultMeta(TITLE, DESCRIPTION);
		}

		@Inject
		private componentApiService: ComponentApiService;

		private title: string = 'Table';

		private subtitle: string = DESCRIPTION;

		private links: Array<any> = [{name: 'Home', to: '/'}, {name: 'Documentation', to: '/documentation'},
			{name: 'Table', to: '/documentation/form-field'}
		];

		private showNumbering: boolean = false;

		private bordered: boolean = false;

		private striped: boolean = false;

		private narrow: boolean = false;

		private tabLinks: Array<any> = [{name: 'Props'}, {name: 'Events'}];

		private userDatas: Array<any> = [
			{'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male'},
			{'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male'},
			{'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female'},
			{'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female'}
		];

		private userColumns: Array<any> = [{name: 'First name'}, {name: 'Last name'},
			{name: 'Created date', position: 'centered', width: 200}, {name: 'Gender'}];

		private userDatas2: Array<any> = [
			{'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male'},
			{'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male'},
			{'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female'},
			{'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Joana', 'last_name': 'Samuel', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Burglar', 'last_name': 'Cattie', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Samuel', 'last_name': 'Wiliam', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Michelle', 'last_name': 'Jackson', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Jacob', 'last_name': 'Jacobo', 'date': '2016-04-10 10:28:46', 'gender': 'Male'},
			{'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female'}
		];

		private userColumns2: Array<any> = [{name: 'First name', sorting: true, key: 'first_name'},
			{name: 'Last name', sorting: true, key: 'last_name'}, {name: 'Created date', position: 'centered'},
			{name: 'Gender'}];

		private userDatas3: Array<any> = [
			{
				'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg'
			},
			{
				'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/anaami/128.jpg'
			},
			{
				'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/danillos/128.jpg'
			},
			{
				'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/antjanus/128.jpg'
			},
			{
				'first_name': 'Joana', 'last_name': 'Samuel', 'date': '2016-04-10 10:28:46', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/flashmurphy/128.jpg'
			},
			{
				'first_name': 'Burglar', 'last_name': 'Cattie', 'date': '2016-04-10 10:28:46', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/aviddayentonbay/128.jpg'
			},
			{
				'first_name': 'Samuel', 'last_name': 'Wiliam', 'date': '2016-04-10 10:28:46', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/danpliego/128.jpg'
			},
			{
				'first_name': 'Michelle', 'last_name': 'Jackson', 'date': '2016-04-10 10:28:46', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/kolmarlopez/128.jpg'
			},
			{
				'first_name': 'Jacob', 'last_name': 'Jacobo', 'date': '2016-04-10 10:28:46', 'gender': 'Male',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/homka/128.jpg'
			},
			{
				'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female',
				'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/a1chapone/128.jpg'
			}
		];

		private userColumns3: Array<any> = [{name: 'First name', sorting: true, key: 'first_name'},
			{name: 'Last name', sorting: true, key: 'last_name'}, {name: 'Created date', position: 'centered'},
			{name: 'Gender'}];

		private userColumns4: Array<any> = [{name: 'First name'}, {name: 'Last name'},
			{name: 'Created date', position: 'centered'}, {name: 'Gender'}];

		private userDatas4: Array<any> = [];

		private perPage: number = 10;

		private isLoading: boolean = false;

		private forceDataEmpty: boolean = false;

		private apiPropsDatas: Array<ComponentApiProps> = [];

		private apiEventsDatas: Array<ComponentApiEvents> = [];

		private apiPropsColumns: Array<string> = ComponentApiProps.Columns();

		private apiEventsColumns: Array<string> = ComponentApiEvents.Columns();

		private get userDatas3Formated() {
			return cloneArray(this.userDatas3).map(item => omit(item, ['avatar']));
		}

		private mounted() {
			this.doFind(1);
			this.doFindApiTable();
		}

		private doFind(page) {
			let url = `https://randomuser.me/api/?page=${page}&results=${this.perPage}`;

			this.isLoading = true;
			axios.get(url).then((response) => {
				this.userDatas4 = (response.data.results || []).map(item => {
					const {gender, name: {first: first_name, last: last_name}, dob: {date}} = item;

					return {first_name, last_name, date, gender};
				});

				this.isLoading = false;
			}).catch(() => this.isLoading = false);
		}

		private async doFindApiTable() {
			const [err, datas] = await this.componentApiService.find('g-table.json');

			if (!err && datas) {
				this.apiPropsDatas = Array.isArray(datas.props) ? datas.props : [];
				this.apiEventsDatas = Array.isArray(datas.events) ? datas.events : [];
			}
		}
	}
</script>