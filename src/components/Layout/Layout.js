import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Items from "../../pages/items";
import Distributors from "../../pages/distributors";
import Clients from "../../pages/clients";
import Payments from "../../pages/payments";
import Bill from "../../pages/bill";
import Users from "../../pages/users";
import Config from "../../pages/config";
import Support from "../../pages/support";
import Faq from "../../pages/faq";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
	var classes = useStyles();

	// global
	var layoutState = useLayoutState();

	return (
		<div className={classes.root}>
			<>
				<Header history={props.history} />
				<Sidebar />
				<div
					className={classnames(classes.content, {
						[classes.contentShift]: layoutState.isSidebarOpened
					})}
				>
					<div className={classes.fakeToolbar} />
					<Switch>
						<Route path="/app/dashboard" component={Dashboard} />
						<Route path="/app/items" component={Items} />
						<Route
							path="/app/distributors"
							component={Distributors}
						/>
						<Route path="/app/clients" component={Clients} />
						<Route path="/app/payments" component={Payments} />
						<Route path="/app/bill" component={Bill} />
						<Route path="/app/users" component={Users} />
						<Route path="/app/config" component={Config} />
						<Route path="/app/support" component={Support} />
						<Route path="/app/faq" component={Faq} />
					</Switch>
				</div>
			</>
		</div>
	);
}

export default withRouter(Layout);
