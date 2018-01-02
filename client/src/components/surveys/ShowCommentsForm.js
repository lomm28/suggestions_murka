import React, { Component } from "react";
import CommentsForm from "./CommentsForm";

export default class ShowCommentsForm extends Component {
	constructor() {
		super();
		this.state = {
			isHidden: true
		};
	}
	toggleHidden() {
		this.setState({
			isHidden: !this.state.isHidden
		});
	}
	render() {
		return (
			<div>
				<button 
					style = {{marginTop: 10}}
					className="yellow darken-3 white-text btn-flat"
					onClick={this.toggleHidden.bind(this)}
				>
					Add Comment
					<i className="material-icons right">comment</i>
				</button>
				{!this.state.isHidden && <CommentsForm id = {this.props.id} />}
			</div>
		);
	}
}