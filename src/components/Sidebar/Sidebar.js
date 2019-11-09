import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
	Home as HomeIcon,
	QuestionAnswer as SupportIcon,
	HelpOutline as FAQIcon,
	ArrowBack as ArrowBackIcon,
	FormatListBulleted as FormatListBulletedIcon,
	LocalShipping as LocalShippingIcon,
	Person as PersonIcon,
	Redeem as RedeemIcon,
	AttachMoney as AttachMoneyIcon,
	LocalAtm as LocalAtmIcon,
	Group as GroupIcon,
	Settings as SettingsIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar
} from "../../context/LayoutContext";

const structure = [
	{ id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
	{
		id: 1,
		label: "Items",
		link: "/app/items",
		icon: <FormatListBulletedIcon />
	},
	{
		id: 2,
		label: "Distributors",
		link: "/app/distributors",
		icon: <LocalShippingIcon />
	},
	{
		id: 3,
		label: "Clients",
		link: "/app/clients",
		icon: <PersonIcon />
	},
	{
		id: 4,
		label: "Payments",
		link: "/app/payments",
		icon: <AttachMoneyIcon />
	},
	{
		id: 5,
		label: "Bill",
		link: "/app/bill",
		icon: <LocalAtmIcon />
	},
	{ id: 6, type: "divider" },
	{ id: 7, type: "title", label: "Settings" },
	{ id: 8, label: "Users", link: "/app/users", icon: <GroupIcon /> },
	{ id: 9, label: "Config", link: "/app/config", icon: <SettingsIcon /> }//,
	// { id: 10, type: "divider" },
	// { id: 11, type: "title", label: "HELP" },
	// { id: 12, label: "Support", link: "/app/support", icon: <SupportIcon /> },
	// { id: 13, label: "FAQ", link: "/app/faq", icon: <FAQIcon /> }
];

function Sidebar({ location }) {
	var classes = useStyles();
	var theme = useTheme();

	// global
	var { isSidebarOpened } = useLayoutState();
	var layoutDispatch = useLayoutDispatch();

	// local
	var [isPermanent, setPermanent] = useState(true);

	useEffect(function() {
		window.addEventListener("resize", handleWindowWidthChange);
		handleWindowWidthChange();
		return function cleanup() {
			window.removeEventListener("resize", handleWindowWidthChange);
		};
	});

	return (
		<Drawer
			variant={isPermanent ? "permanent" : "temporary"}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpened,
				[classes.drawerClose]: !isSidebarOpened
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpened,
					[classes.drawerClose]: !isSidebarOpened
				})
			}}
			open={isSidebarOpened}
		>
			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBackIcon
						classes={{
							root: classNames(
								classes.headerIcon,
								classes.headerIconCollapse
							)
						}}
					/>
				</IconButton>
			</div>
			<List className={classes.sidebarList}>
				{structure.map(link => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
			</List>
		</Drawer>
	);

	// ##################################################################
	function handleWindowWidthChange() {
		var windowWidth = window.innerWidth;
		var breakpointWidth = theme.breakpoints.values.md;
		var isSmallScreen = windowWidth < breakpointWidth;

		if (isSmallScreen && isPermanent) {
			setPermanent(false);
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true);
		}
	}
}

export default withRouter(Sidebar);
