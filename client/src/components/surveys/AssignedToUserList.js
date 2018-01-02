import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAssignedToUser } from "../../actions";
import ShowCommentsForm from "./ShowCommentsForm";
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

	renderComments(comment, manager) {
		return (
			<blockquote>
				<p>Commented by: <span style={{textDecoration: "underline"}}>{manager}</span></p><br />
					<span style={{fontFamily: "Trebuchet", fontWeight: "bold"}}>{comment}</span>
			</blockquote>
		);
	}

	renderUserSpecificSurveys() {
		return this.props.assignedToUser.reverse().map(survey => {
			return (
				<div className = "card hoverable blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text" style={{marginBottom: 25}}>
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						{ survey.comment ? this.renderComments(survey.comment, survey.commentByManager) : null }
						<p 
							className="right"
							style = {{marginTop: 10}}
						>
							Sent On {new Date(survey.dateSent).toLocaleDateString()}
						</p>
						<ShowCommentsForm id={survey._id} />
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