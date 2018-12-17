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
                             :fullWidth="true"
                             :info="true" :usePaging="true" :perPage="perpage" :totalData="100" @changePage="doFind()">
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
                    <p>Contoh form control</p>
                    <g-field label="Cek label" :isHorizontal="true" :type="checkbox1 ? 'success' : 'warning'">
                        <g-checkbox v-model="checkbox1">Checkbox biasa value {{checkbox1}}</g-checkbox>
                        <g-checkbox class="is-expanded" v-model="checkbox1">Checkbox biasa value {{checkbox1}}
                        </g-checkbox>
                    </g-field>
                    <g-field :isHorizontal="true" label="Cek multi oke">
                        <g-checkbox v-model="checkboxMultiVal" native-value="Karina">
                            Karina
                        </g-checkbox>
                        <g-checkbox v-model="checkboxMultiVal" native-value="Sembadra">
                            Sembadra
                        </g-checkbox>
                        <g-checkbox v-model="checkboxMultiVal" native-value="Arjuna">
                            Arjuna
                        </g-checkbox>
                    </g-field>
                    <g-field :isHorizontal="true" label="Isi dengan string" type="success"
                             message="Brown fox cekk">
                        <g-input v-model="textContoh" shape="sharped">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                        <g-input v-model="textContoh2" shape="rounded">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                    </g-field>
                    <g-field :isGrouped="true" type="success">
                        <g-input v-model="textContoh" shape="sharped">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                        <div class="control">
                            <g-button type="info">Oke</g-button>
                        </div>
                    </g-field>
                    <g-field :hasAddons="true" type="success">
                        <g-input v-model="textContoh" shape="sharped">
                            <i slot="iconLeft" class="fab fa-facebook"></i>
                            <i slot="iconRight" class="fab fa-twitter"></i>
                        </g-input>
                        <div class="control">
                            <g-button type="info">Oke</g-button>
                        </div>
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