//import _ from "lodash";
import React, { Component } from "react";
import Column1 from "./Column1";
import Column2 from "./Column2";
import Column3 from "./Column3";

const sectionColumns = [
	{
		icons: "flash_on",
		title: "Speeds up development",
		text:
			"We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers."
	},
	{
		icons: "group",
		title: "User Experience Focused",
		text:
			"By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience."
	},
	{
		icons: "settings",
		title: "Easy to work with",
		text:
			"We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize."
	}
];

class Section extends Component {
	render() {
		return (
			<div className="container">
				<div className="section">
					<div className="row">
					<Column1 />
					<Column2 />
					<Column3 />
					</div>
				</div>
			</div>
		);
	}
}

export default Section;