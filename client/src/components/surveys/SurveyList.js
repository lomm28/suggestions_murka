import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import nosuggestions from "../img/nosuggestions.png";

class SurveyList extends Component {

	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderNoImg() {
		return (
			<div className="row center">
				<img alt="No Suggestions here" src={nosuggestions} />
			</div>
		);
	}

	renderComments(comment, manager) {
		return (
			<blockquote>
				<p>Commented by: <span style={{textDecoration: "underline"}}>{manager}</span></p><br />
					<span style={{fontFamily: "Trebuchet", fontWeight: "bold"}}>{comment}</span>
			</blockquote>
		);
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="card blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						{ survey.comment ? this.renderComments(survey.comment, survey.commentByManager) : null }
						<p className="right">
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>Sent to: {survey.responsibleDept}</a>
						<a>Email: {survey.deptEmail}</a>
						<a>Status: {survey.status}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div className = "container">{this.renderSurveys().length ? this.renderSurveys() : this.renderNoImg() }</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);