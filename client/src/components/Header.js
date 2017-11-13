import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./img/logo_3.png";

class Header extends Component {


	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Log in with Google</a>
					</li>
				);
			default:
				return [
					<li key="1">
						<a href="#">Assigned to me</a>
					</li>,
					<li key="3" style={{ margin: "0 10px" }}>
						<a href="/api/surveys/all">All suggestions</a>
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
						>
							Suggestia
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