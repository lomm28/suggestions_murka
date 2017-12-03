import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import SelectorField from "./SelectorField";
import DropzoneField from './DropzoneField';
import formFields from "./formFields";


const departments = [
	{ name: "Support", value: "brandnewgarage@gmail.com" },
	{ name: "Scatters", value: "newgarage@ukr.net" },
	{ name: "BI", value: "dmitrij.danko@murka.com" },
	{ name: "Era team", value: "dmytro.danko@webinsights.co" }
];

class SurveyForm extends Component {

	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	renderDropDown() {
		return (
			<div>
				<Field 
					component = {SelectorField}
					name = "responsibleDept"
					data = {departments}
					valueField = "value"
					textField = "name"
					label = "Responsible Department"
				/>
			</div>
		);
	}

	renderDropzoneField() {
		return (
           	<div className="row">
              	<div className="col s12 m6 push-m3">
					<Field 
						component={ DropzoneField } 
						name="uploadfile" 
						accept="image/*, video/*, audio/mp3, .doc, .pdf"
					/>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div
				className="container"
				style={{ marginTop: "10px", marginBottom: "10px" }}
			>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
				
					{ this.renderFields() }
				
					{ this.renderDropDown() }

					{ this.renderDropzoneField() }
				
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = "You must provide a value";
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false
})(SurveyForm);