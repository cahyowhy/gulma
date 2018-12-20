<!--suppress ALL -->
<template>
    <page-container :title="title" :links="links" :subtitle="subtitle">
        <p>This component can be formated for certain component. example</p>
        <ul>
            <li>g-input</li>
            <li>g-select</li>
            <li>g-checkbox</li>
            <li>g-button</li>
            <li>g-radiobutton</li>
        </ul>
        <p>All examples on this page refer to bulma <a href="https://bulma.io/documentation/form/general/"
                                                       target="_blank">Form control</a> page
        </p>
        <gist-wrapper gist-id="adff0c6fb889112f7bcb6b9b62770bad" is-horizontal
                      file="basicform.vue" title="Basic Form field">
            <template>
                <form>
                    <g-field label="Name">
                        <g-input maxlength="20" placeholder="Default Text Input"/>
                    </g-field>
                    <g-field label="Username" message="Username is avalaible" type="success">
                        <g-input value="cahyowhy"/>
                    </g-field>
                    <g-field label="Email" message="Email format is wrong!" type="danger">
                        <g-input value="cahyowhy01@gmail.com">
                            <i slot="iconLeft" class="fas fa-envelope-open-text"></i>
                            <i slot="iconRight" class="fas fa-times"></i>
                        </g-input>
                    </g-field>
                    <g-field label="Subject">
                        <g-select placeholder="Choose only one">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </g-select>
                    </g-field>
                    <g-field label="Bio">
                        <g-input input-type="textarea" placeholder="Fill with your bio">
                        </g-input>
                    </g-field>
                    <g-field label="Yes no question">
                        <g-radiobutton v-model="radioButton1" native-value="yes">Yes</g-radiobutton>
                        <g-radiobutton v-model="radioButton1" native-value="no">No</g-radiobutton>
                    </g-field>
                    <g-field label="Agreement and the others">
                        <g-checkbox>I agree to the terms and conditions</g-checkbox>
                    </g-field>
                    <g-field class="has-text-right">
                        <g-button value="Send" type="info"></g-button>
                    </g-field>
                </form>
            </template>
            <template slot="content">
                <p>A simple example of the application of g-fields to wrap the input components inside. You can include
                    left and right icons for components such as g-select and g-input. You can also give a label and
                    message to the g-field component</p>
                <div class="notification is-info">
                    All props such as type, size, shape and position attached to the g-field component will be inherited
                    in the child component if the child component is a direct child from g-field
                </div>
            </template>
        </gist-wrapper>

        <gist-wrapper gist-id="148b7a3f3dab18641de8a2de1c707d1e" is-horizontal
                      file="colorstypeform.vue" title="Colors type and Form size">
            <template>
                <form>
                    <g-field label="Color Danger" message="Example colors type danger" type="danger">
                        <g-input value="danger">
                            <i slot="iconLeft" class="fas fa-user-slash"></i>
                            <i slot="iconRight" class="fas fa-times"></i>
                        </g-input>
                    </g-field>
                    <g-field label="Color success" type="success" message="Example colors type success">
                        <g-checkbox>I agree to the terms and conditions</g-checkbox>
                    </g-field>
                    <g-field label="Color warning" type="warning" message="Example colors type warning">
                        <g-radiobutton v-model="radioButton1" native-value="yes">Yes</g-radiobutton>
                        <g-radiobutton v-model="radioButton1" native-value="no">No</g-radiobutton>
                    </g-field>
                    <g-field label="Color info" type="info" message="Example colors type info">
                        <g-select placeholder="Choose only one">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </g-select>
                    </g-field>
                    <g-field label="This is small size" size="small">
                        <g-input value="small"></g-input>
                    </g-field>
                    <g-field label="This is normal size">
                        <g-input value="normal"></g-input>
                    </g-field>
                    <g-field label="This is medium size" size="medium">
                        <g-input value="medium"></g-input>
                    </g-field>
                    <g-field label="This is large size" size="large">
                        <g-input value="large"></g-input>
                    </g-field>
                </form>
            </template>
            <template slot="content">
                <p>The (type / color) can be used to<i>"marking"</i>
                    some validation. You can also adjust the size of some
                    components such as input, select and button
                </p>
            </template>
        </gist-wrapper>

        <gist-wrapper gist-id="3257e8035e50bb04e4eff8395125116a" file="formaddons.vue"
                      title="Using has-addons properties">
            <template>
                <form>
                    <div class="block">
                        <p class="title is-6">Basic Addon</p>
                        <g-field has-addons>
                            <g-input placeholder="default addon"/>
                            <div class="control">
                                <g-button type="info">Ok</g-button>
                            </div>
                        </g-field>
                    </div>
                    <div class="block">
                        <p class="title is-6">Static Addon</p>
                        <g-field has-addons>
                            <g-input placeholder="static addon"/>
                            <div class="control">
                                <g-button type="static">Ok</g-button>
                            </div>
                        </g-field>
                    </div>
                    <div class="block">
                        <div class="block">
                            <p class="title is-6">Using with <span class="tag">is-expanded</span> attributes</p>
                            <g-field has-addons>
                                <g-input is-expanded placeholder="expanded attribute"/>
                                <div class="control">
                                    <g-button type="info">Ok</g-button>
                                </div>
                            </g-field>
                            <g-field has-addons type="info">
                                <g-select value="$">
                                    <option>$</option>
                                    <option>£</option>
                                    <option>€</option>
                                </g-select>
                                <g-input is-expanded placeholder="some advanced expanded attribute"/>
                                <div class="control">
                                    <g-button type="info">Ok</g-button>
                                </div>
                            </g-field>
                        </div>
                        <div class="block">
                            <p class="title is-6">Using <span class="tag">is-expanded</span> on g-select component</p>
                            <g-field has-addons type="success">
                                <g-select placeholder="Choose one" is-expanded is-fullwidth>
                                    <option value="darth vader">Darth vader</option>
                                    <option value="darth maul">Darth maul</option>
                                    <option value="darth sidious">Darth sidious</option>
                                    <option value="kylo ren">Kylo ren</option>
                                </g-select>
                                <div class="control">
                                    <g-button type="success">Ok</g-button>
                                </div>
                            </g-field>
                        </div>
                        <div class="block">
                            <p class="title is-6">Applying addon with position</p>
                            <g-field position="centered" has-addons>
                                <g-input placeholder="centered addon"/>
                                <div class="control">
                                    <g-button type="static">Ok</g-button>
                                </div>
                            </g-field>
                            <g-field position="right" has-addons>
                                <g-input placeholder="right addon"/>
                                <div class="control">
                                    <g-button type="static">Ok</g-button>
                                </div>
                            </g-field>
                        </div>
                    </div>
                </form>
            </template>
        </gist-wrapper>

        <gist-wrapper gist-id="eeb29f94831ad27e1215d85a0b0f133b" file="formgroups.vue"
                      title="Using is-grouped properties" is-horizontal>
            <template>
                <form>
                    <div class="block">
                        <p class="title is-6">Adjust position of grouped component</p>
                        <g-field is-grouped>
                            <div class="control">
                                <g-button type="primary">Submit</g-button>
                            </div>
                            <div class="control">
                                <g-button type="light">Cancel</g-button>
                            </div>
                        </g-field>
                        <g-field position="centered" is-grouped>
                            <div class="control">
                                <g-button type="primary">Submit</g-button>
                            </div>
                            <div class="control">
                                <g-button type="light">Cancel</g-button>
                            </div>
                        </g-field>
                        <g-field position="right" is-grouped>
                            <div class="control">
                                <g-button type="primary">Submit</g-button>
                            </div>
                            <div class="control">
                                <g-button type="light">Cancel</g-button>
                            </div>
                        </g-field>
                    </div>
                    <div class="block">
                        <p class="title is-6">Using with input</p>
                        <g-field is-grouped>
                            <g-input placeholder="Find username"></g-input>
                            <div class="control">
                                <g-button type="info">Find</g-button>
                            </div>
                        </g-field>
                        <g-field is-grouped>
                            <g-input placeholder="Find username" is-expanded></g-input>
                            <div class="control">
                                <g-button type="info">Find</g-button>
                            </div>
                        </g-field>
                    </div>
                    <div class="block">
                        <p class="title is-6">Using props <span class="tag">is-grouped-multiline</span> to allow
                            controls to fill up multiple lines</p>
                        <g-field is-grouped is-grouped-multiline>
                            <div class="control">
                                <g-button>One</g-button>
                            </div>
                            <div class="control">
                                <g-button>Two</g-button>
                            </div>
                            <div class="control">
                                <g-button>Three</g-button>
                            </div>
                            <div class="control">
                                <g-button>Four</g-button>
                            </div>
                            <div class="control">
                                <g-button>Five</g-button>
                            </div>
                            <div class="control">
                                <g-button>Six</g-button>
                            </div>
                            <div class="control">
                                <g-button>Seven</g-button>
                            </div>
                            <div class="control">
                                <g-button>Eight</g-button>
                            </div>
                            <div class="control">
                                <g-button>Nine</g-button>
                            </div>
                            <div class="control">
                                <g-button>Ten</g-button>
                            </div>
                        </g-field>
                    </div>
                </form>
            </template>
        </gist-wrapper>

        <gist-wrapper gist-id="945b91cb50cadd8a5c1f0b1fbb22d2d7" file="formhorizontal.vue" title="Form Horizontal">
            <template>
                <form>
                    <g-field label="Name" is-horizontal>
                        <g-input maxlength="20" placeholder="Default Text Input"/>
                    </g-field>
                    <g-field label="Username" message="Username is avalaible" type="success" is-horizontal>
                        <g-input value="cahyowhy"/>
                    </g-field>
                    <g-field label="Email" message="Email format is wrong!" type="danger" is-horizontal>
                        <g-input value="cahyowhy01@gmail.com">
                            <i slot="iconLeft" class="fas fa-envelope-open-text"></i>
                            <i slot="iconRight" class="fas fa-times"></i>
                        </g-input>
                    </g-field>
                    <g-field label="Phone number" is-horizontal>
                        <g-input label="Office phone number" type="danger" message="phone number not valid"
                                 value="6281xx"></g-input>
                        <g-input label="Home phone number"></g-input>
                    </g-field>
                    <g-field label="Subject" is-horizontal>
                        <g-select placeholder="Choose only one" is-expanded is-fullwidth>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </g-select>
                    </g-field>
                    <g-field label="Bio" is-horizontal>
                        <g-input input-type="textarea" placeholder="Fill with your bio">
                        </g-input>
                    </g-field>
                    <g-field label="Yes no question" is-horizontal>
                        <g-radiobutton v-model="radioButton1" native-value="yes">Yes</g-radiobutton>
                        <g-radiobutton v-model="radioButton1" native-value="no">No</g-radiobutton>
                    </g-field>
                    <g-field label="Agreement and the others" is-horizontal>
                        <g-checkbox>I agree to the terms and conditions</g-checkbox>
                    </g-field>
                    <g-field class="has-text-right" is-horizontal>
                        <g-button value="Send" type="info"></g-button>
                    </g-field>
                </form>
            </template>
            <template slot="content">
                <p>You can pass is-horizontal props directly to the <span class="tag">g-field</span> to apply horizontal
                    form</p>
                <div class="notification is-warning">
                    If length of children > 1, then properties such as type, shape, size, position & etc that exist in
                    g-field will
                    not applied to children. You can apply the property directly on the child component
                </div>
            </template>
        </gist-wrapper>

        <div class="content-api-wrapper">
            <h2 class="title is-4">API</h2>
            <g-table :columns="columns" type="info" :datas="datas" full-width bordered>
                <template slot-scope="{data, index, currentPage}">
                    <g-table-column><div class="content" v-html="data.name"></div></g-table-column>
                    <g-table-column><div class="content" v-html="data.description"></div></g-table-column>
                    <g-table-column><div class="content" v-html="data.type"></div></g-table-column>
                    <g-table-column><div class="content" v-html="data.values"></div></g-table-column>
                    <g-table-column><div class="content" v-html="data.defaultValue"></div></g-table-column>
                </template>
            </g-table>
        </div>
    </page-container>
</template>

<script lang="ts">
	import {Component, Vue, MetaTag, Inject} from "annotation";
	import DefaultMeta from '../../../util/DefaultMeta';
	import ComponentApiProps from '../../../models/ComponentApiProps';
	import ComponentApiService from '../../../service/ComponentApiService';

	const TITLE = 'Gulma | Components | Form field';
	const DESCRIPTION = 'Parent component for form componet to organizing form input';

	@Component
	export default class FormField extends Vue {

		@MetaTag
		private info() {
			return DefaultMeta(TITLE, DESCRIPTION);
		}

		@Inject
		private componentApiService: ComponentApiService

		private links: Array<any> = [{name: 'Home', to: '/'}, {name: 'Documentation', to: '/documentation'},
			{name: 'Form field', to: '/documentation/form-field'}
		];

		private title: string = 'Form field';

		private subtitle: string = DESCRIPTION;

		private radioButton1: string = 'no';

		private columns: Array<any> = ComponentApiProps.Columns();

		private datas: Array<any> = [];

		private mounted() {
			this.doFind();
		}

		private async doFind() {
			const [err, datas] = await this.componentApiService.find('g-field.json');
			if (!err && datas.props && datas.props.length) {
				this.datas = datas.props;
			}
		}
	}
</script>