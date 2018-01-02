import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import googlebtn from "./img/google-btn.png";

class Header extends Component {


	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google"> Login with Google </a>
					</li>
				);
			default:
				return [
					<li key="1">
						<Link to="/surveys/assigned/to/user">Assigned to me</Link>
					</li>,
					<li key="3" style={{ margin: "0 10px" }}>
						<Link to="/all/surveys">All suggestions</Link>
					</li>,
					<li key="2">
						<a href="/api/logout">Log out</a>
					</li>
				];
		}
	}

	render() {
		return (
			<header>
				<nav className="light-blue lighten-1" role="navigation" className="navbar-material">
					<div className="nav-wrapper container">
						<Link
							to={this.props.auth ? "/surveys" : "/"}
							id="logo-container"
							className="brand-logo"
							style={{fontFamily: "Lobster, cursive"}}
						>
							Suggestia
							<i className="material-icons">lightbulb_outline</i>
						</Link>
						<ul className="right">{this.renderContent()}</ul>
					</div>
				</nav>
			</header>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);