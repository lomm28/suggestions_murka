import React from "react";

const Footer = () => {
	return (
		<footer className="page-footer orange">
			<div className="container">
				<div className="row">
					<div className="col l6 s12">
						<h5 className="white-text">Company Bio</h5>
						<p className="grey-text text-lighten-4">
							Wombats are short-legged, muscular quadrupedal
							marsupials that are native to Australia. They are
							about 1 m (40 in) in length with small, stubby
							tails. There are three extant species and they are
							all members of the family Vombatidae.
						</p>
					</div>
					<div className="col l3 s12">
						<h5 className="white-text">Settings</h5>
						<ul>
							<li>
								<a className="white-text" href="#!">
									Link 1
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Link 2
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Link 3
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Link 4
								</a>
							</li>
						</ul>
					</div>
					<div className="col l3 s12">
						<h5 className="white-text">Connect</h5>
						<ul>
							<li>
								<a className="white-text" href="#!">
									Link 1
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Link 2
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Link 3
								</a>
							</li>
							<li>
								<a className="white-text" href="#!">
									Link 4
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container">
					Copyright © 2017
					<a
						className="orange-text text-lighten-3"
						href="#"
					>
						All rights reserved.
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;