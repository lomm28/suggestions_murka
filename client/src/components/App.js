import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import DashBoard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import AllSurveysList from './surveys/AllSurveysList';
import AssignedToUserList from './surveys/AssignedToUserList';
import Footer from "./Footer";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div 
					style={{ display: "flex",
							 minHeight: "100vh",
							 flexDirection: "column" }}
				>
					<Header />
					<main>
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={DashBoard} />
						<Route exact path="/allSurveys" component={AllSurveysList} />
						<Route exact path="/surveys/assigned/to/user" component={AssignedToUserList} />
						<Route path="/surveys/new" component={SurveyNew} />
					</main>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);