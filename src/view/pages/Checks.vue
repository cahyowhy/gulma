<!--suppress ALL -->
<template>
    <div class="check-wrapper">
        <g-tab :links="links">
            <template slot="tab-item" slot-scope="{link}">
                <span class="icon">
                    <i class="fas fa-smile-beam"></i>
                </span>
                <span>{{link.name}}</span>
            </template>
            <template slot-scope="{index, active}">
                <g-tab-content>
                    <g-table :isLoading="isLoading" :columns="columns" :bordered="true" :datas="userDatas"
                             is-full-width :info="true" use-paging :perPage="perpage" :totalData="100"
                             @changePage="doFind()">
                        <template slot-scope="{data, index, currentPage}">
                            <g-table-column :position="columns[0].position" :label="columns[0].name">
                                <div class="user-info-wrapper">
                                    <div class="image is-48x48">
                                        <img :src="users[index].picture" class="is-rounded">
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
                                        <img :src="users[index].picture">
                                    </p>
                                </figure>
                                <div class="media-content">
                                    <div class="content">
                                        <p class="title is-5">{{data.name}}</p>
                                        <p>{{data.email}}</p>
                                        <p>{{data.dob}}</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna
                                            eros,
                                            eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus
                                            odio
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
                </g-tab-content>
                <g-tab-content>
                    <g-field label="Checkbox Horizontal" :isHorizontal="true" :type="checkbox1 ? 'success' : 'warning'">
                        <g-checkbox v-model="checkbox1">Checkbox biasa value {{checkbox1}}</g-checkbox>
                        <g-checkbox class="is-expanded" v-model="checkbox1">Checkbox biasa value {{checkbox1}}
                        </g-checkbox>
                    </g-field>
                    <g-field :isHorizontal="true" label="Multiple Select Checkbox">
                        <g-checkbox v-model="checkboxMultiVal" native-value="Karina">
                            Karina
                        </g-checkbox>
                        <g-checkbox v-model="checkboxMultiVal" native-value="Sembadra">
                            Sembadra
                        </g-checkbox>
                        <g-checkbox v-model="checkboxMultiVal" native-value="Arjuna">
                            Arjuna
                        </g-checkbox>
                        <g-checkbox v-model="checkboxMultiVal" :indeterminate="true" native-value="Sadewa">
                            Sadewa
                        </g-checkbox>
                    </g-field>
                    <g-field :isHorizontal="true" label="Input horizontal">
                        <g-input v-model="textContoh" shape="rounded"
                                 :type="textContoh.length ? 'success' : 'danger'"
                                 label="Label pertama" message="Oke value">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                    </g-field>
                    <g-field :isHorizontal="true" label="Multi input horizontal">
                        <g-input v-model="textContoh" shape="sharped"
                                 :type="textContoh.length ? 'success' : 'danger'"
                                 label="Label pertama" message="Oke value">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                        <g-input v-model="textContoh2" shape="rounded"
                                 :type="textContoh2.length ? 'success' : 'danger'"
                                 label="Label kedua" message="Oke value">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                    </g-field>
                    <g-field :isHorizontal="true" label="Select horizontal">
                        <g-select v-model="selectValue" shape="rounded" a
                                  :type="selectValue ? 'success' : 'danger'"
                                  label="Label select" message="Oke value" placeholder="Pilih nilai yang akan dipilih">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <template>
                                <option v-for="(value, index) in selectValues" :value="value">{{value}}</option>
                            </template>
                        </g-select>
                    </g-field>
                </g-tab-content>
                <g-tab-content>
                    <p>Index {{index}}</p>
                </g-tab-content>
                <g-tab-content>
                    <p>Index {{index}}</p>
                </g-tab-content>
            </template>
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

		private checkbox1: boolean = true;

		private checkboxMultiVal: Array<any> = [];

		private textContoh: string = '';

		private textContoh2: string = '';

		private selectValues: Array<string> = new Array(10).fill('').map((item, index) => 'Value at ' + index);

		private selectValue: string;

		private mounted() {
			this.doFind();
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