//SurveyFormReview shows users their entries for review;
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import objectToFormData from "object-to-formdata";

const SurveyReview = ({
	onCancel,
	formValues,
	submitSurvey,
	history
}) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	const dropDownValue = formValues.responsibleDept.value;
	const dropDownName = formValues.responsibleDept.name;

	return (
		<div className="container" style={{ marginBottom: "10px" }}>
			<h5>Please confirm your entries!</h5>
			{ reviewFields }
			<div>
				<label>Responsible Department</label>
				<div>{ dropDownName }</div>
				<div>Yoour suggestion will be sent to <span className="orange-text">{ dropDownValue }</span></div>
			</div>
			<div>
				<label>Uploaded File</label>
				<div>{ formValues.uploadfile[0].name }</div>
			</div>
			
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
				Back
			</button>
			<button
				className="green btn-flat right white-text"
				onClick={() => submitSurvey(formValues, history)}
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	
	return {
		formValues: state.form.surveyForm.values
	};

}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));