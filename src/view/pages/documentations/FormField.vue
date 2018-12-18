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
        <gist-wrapper gist-id="adff0c6fb889112f7bcb6b9b62770bad" :isHorizontal="true"
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

        <gist-wrapper gist-id="148b7a3f3dab18641de8a2de1c707d1e" :isHorizontal="true"
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
    </page-container>
</template>

<script lang="ts">
	import {Component, Vue, MetaTag} from "annotation";
	import DefaultMeta from '../../../util/DefaultMeta';

	const TITLE = 'Gulma | Components | Form field';
	const DESCRIPTION = 'Parent component for form componet to organizing form input';

	@Component
	export default class FormField extends Vue {

		@MetaTag
		private info() {
			return DefaultMeta(TITLE, DESCRIPTION);
		}

		private links: Array<any> = [{name: 'Home', to: '/'}, {name: 'Documentation', to: '/documentation'},
			{name: 'Form field', to: '/documentation/form-field'}
		];

		private title: string = 'Form field';

		private subtitle: string = DESCRIPTION;

		private radioButton1: string = 'no';

		private select1: string = '';
	}
</script>