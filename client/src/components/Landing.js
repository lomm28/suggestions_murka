import React from "react";
import Section from "./Section";
import logo from "./img/logo_4.png";

const Landing = () => {
	return (
		<div>
			<div className="section no-pad-bot" id="index-banner">
				<div className="container">
					<br />
					<h1 className="header center orange-text">
						Welcome, friends!
					</h1>
					<div className="row center">
						<h5 className="header col s12 light">
							A modern responsive front-end framework based on
							Material Design
						</h5>
					</div>
					<div className="row center">
						<img src={logo} />
					</div>
					<br />
				</div>
			</div>
			<Section />
		</div>
	);
};

export default Landing;