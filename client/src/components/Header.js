import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Log in with Google</a></li>;
			default:
				return [
					<li key = "1"><a href="#">Assigned to me</a></li>,
					<li key = "3" style = {{ margin: "0 10px" }}><a href="#"> Submitted by myself</a></li>,
					<li key = "2"><a href="/api/logout">Log out</a></li>
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link 
						to = {this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Suggestions-Murka
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);