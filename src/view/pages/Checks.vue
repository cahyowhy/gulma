<!--suppress ALL -->
<template>
    <div class="check-wrapper">
        <g-tab :links="links">
            <div slot="tab-content-0" slot-scope="{index, active}">
                <g-table :isLoading="isLoading" :columns="columns" :bordered="true" :datas="userDatas" :fullWidth="true"
                         :info="true" :usePaging="true" :perPage="perpage" :totalData="100" :frontEndPagination="true">
                    <template slot="thead" slot-scope="{colSpan, sortFn, isSortAscending, currentSorting}">
                        <tr>
                            <g-table-column-head :colspan="colSpan" position="centered">
                                <span>Contoh custom thead</span>
                            </g-table-column-head>
                        </tr>
                        <tr>
                            <g-table-column-head>
                                <span>No. </span>
                            </g-table-column-head>
                            <template v-for="(column, index) in columns">
                                <g-table-column-head :position="column.position" @click="sortFn(index, column.key)"
                                                     :sorting="column.sorting && currentSorting === index"
                                                     :width="column.width" :isSortAscending="isSortAscending">
                                    <span>{{column.name}}</span>
                                </g-table-column-head>
                            </template>
                        </tr>
                    </template>
                    <template slot-scope="{data, index, currentPage}">
                        <g-table-column :position="columns[0].position" :label="columns[0].name">
                            <div class="user-info-wrapper">
                                <div class="image is-48x48">
                                    <img :src="users[fixedIndex(index, currentPage)].picture" class="is-rounded">
                                </div>
                                <span>{{data.name}}</span>
                            </div>
                        </g-table-column>
                        <g-table-column :position="columns[1].position" :label="columns[1].name">{{data.dob}}
                        </g-table-column>
                        <g-table-column :position="columns[2].position" :label="columns[2].name">{{data.email}}
                        </g-table-column>
                        <g-table-column :position="columns[3].position" :label="columns[3].name">{{data.phone}}
                        </g-table-column>
                        <g-table-column :position="columns[4].position" :label="columns[4].name">{{data.location}}
                        </g-table-column>
                    </template>
                    <template slot="detail" slot-scope="{data, index, currentPage}">
                        <article class="media user-detail">
                            <figure class="media-left">
                                <p class="image is-64x64">
                                    <img :src="users[fixedIndex(index, currentPage)].picture">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p class="title is-5">{{data.name}}</p>
                                    <p>{{data.email}}</p>
                                    <p>{{data.dob}}</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros,
                                        eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio
                                        quis feugiat facilisis.</p>
                                </div>
                            </div>
                        </article>
                    </template>
                    <template slot="empty">
                        <div class="has-text-centered">
                            <p><i class="fas fa-sad-tear fa-3x"></i></p>
                            <p>No data displayed</p>
                        </div>
                    </template>
                </g-table>
            </div>
            <div slot="tab-content-1" slot-scope="{index, active}">
                <p>Index {{index}}</p>
            </div>
            <div slot="tab-content-2" slot-scope="{index, active}">
                <p>Index {{index}}</p>
            </div>
            <div slot="tab-content-3" slot-scope="{index, active}">
                <p>Index {{index}}</p>
            </div>
        </g-tab>
    </div>
</template>

<script lang="ts">
	import {cloneDeep} from 'lodash';
	import {Component, Vue, Inject} from 'annotation';
	import {dummyTabsLinks} from '../../util/Dummies';
	import UserService from '../../service/UserService';

	import User from '../../models/User';
	import GTableColumn from "../components/table/GTableColumn";
	import GTableColumnHead from "../components/table/GTableColumnHead";

	@Component({
		components: {GTableColumnHead, GTableColumn}
	})
	export default class Checks extends Vue {

		@Inject
		private userService: UserService;

		private users: Array<User> = [];

		private links: Array<any> = dummyTabsLinks();

		private columns: Array<any> = User.Columns();

		private isLoading: boolean = false;

		private perpage: number = 10;

		private mounted() {
			this.doFind(100);
		}

		private get userDatas(): Array<any> {
			return cloneDeep(this.users).map(item => item.table());
		}

		private async doFind(results: number = 10) {
			this.isLoading = true;
			const [err, users] = await this.userService.find({results});

			if (!err) {
				this.users = users;
			}

			this.isLoading = false;
		}

		private fixedIndex(index: number = 0, currentPage: number = 1) {
			return (this.perpage * (currentPage - 1)) + index;
		}
	}
</script>

<style scoped lang="scss">
    @import "../../style/variable";

    .check-wrapper {
        padding: 1rem;
    }

    .user-info-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        .image {
            margin-right: .75rem;
        }
    }

    .user-detail .content {
        p {
            margin-bottom: 0;
            &:first-child {
                margin-bottom: .75rem;
            }
            &:not(:first-child) {
                font-size: .9rem;
                color: $grey-dark;
            }
        }
    }
</style>