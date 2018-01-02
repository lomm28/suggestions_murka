import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import SurveyField from "./SurveyField";
import { connect } from "react-redux";
import * as actions from "../../actions";

let FormProps = (props) => {
	const { handleSubmit, addComment } = props;

	return (
	    <form>
            <Field
                key={props.id}
                component={SurveyField}
                type="text"
                label="Leave your comment here"
                name="comments"
            />
            <button
                type="submit"
                className="green btn-flat right white-text"
                onClick={()=> addComment({id: props.id, comment: props.comment})}
            >
                Submit
                <i className="material-icons right">email</i>
            </button>
        </form>
	);

};

function validate(props) {
	
	let errors = {};

		if (!props.comment) {
			errors = "You must provide a value";
		}

	return errors;
}

FormProps = reduxForm({
  form: "commentsForm",
  validate 
})(FormProps);

const selector = formValueSelector('commentsForm');

FormProps = connect(
	state => {
  		// selecting values individually
  		const comment = selector(state, 'comments')

  		return {
    		comment
  		}
  
}, actions)(FormProps);

export default FormProps;
