import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAssignedToUser } from "../../actions";
import nosuggestions from "../img/nosuggestions.png";

class AssignedToUserList extends Component {

	componentDidMount() {
		this.props.fetchAssignedToUser();
	}

	renderNoImg() {
		return (
			<div className="row center">
				<img alt="No Suggestions here" src={nosuggestions} />
			</div>
		);
	}

	renderUserSpecificSurveys() {
		return this.props.assignedToUser.reverse().map(survey => {
			return (
				<div className = "card blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>Sent to {survey.responsibleDept}</a>
						<a>Email {survey.deptEmail}</a>
						<a>Status: {survey.status}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div className = "container">{this.renderUserSpecificSurveys().length ? this.renderUserSpecificSurveys() : this.renderNoImg() }</div>;
	}
}

function mapStateToProps({ assignedToUser }) {
	return { assignedToUser };
}

export default connect(mapStateToProps, { fetchAssignedToUser })(AssignedToUserList);