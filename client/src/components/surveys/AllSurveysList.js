import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllSurveys } from "../../actions";
import nosuggestions from "../img/nosuggestions.png";

class AllSurveysList extends Component {

	componentDidMount() {
		this.props.fetchAllSurveys();
	}

	renderNoImg() {
		return (
			<div className="row center">
				<img alt="No Suggestions here" src={nosuggestions} />
			</div>
		);
	}


	renderAllSurveys() {
		return this.props.allSurveys.reverse().map(survey => {
			return (
				<div className="card blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
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
		return <div className = "container">{this.renderAllSurveys().length ? this.renderAllSurveys() : this.renderNoImg() }</div>;
	}
}

function mapStateToProps({ allSurveys }) {
	return { allSurveys };
}

export default connect(mapStateToProps, { fetchAllSurveys })(AllSurveysList);