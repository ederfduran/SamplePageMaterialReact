import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import logo from "../../assets/logo.svg";

const ElevationScroll = (props) => {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: "3em",
		[theme.breakpoints.down("md")]: {
			marginBottom: "2em",
		},
		[theme.breakpoints.down("xs")]: {
			marginBottom: "1.25em",
		},
	},
	logo: {
		height: "8em",
		[theme.breakpoints.down("md")]: {
			height: "7em",
		},
		[theme.breakpoints.down("xs")]: {
			height: "5.5em",
		},
	},
	tabContainer: {
		marginLeft: "auto",
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: "25px",
	},
	button: {
		...theme.typography.estimate,
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
	},
	buttonContainer: {
		padding: 0,
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	menu: {
		backgroundColor: theme.palette.common.arcGreen,
		borderRadius: "0px",
	},
	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		"&:hover": {
			opacity: 1,
		},
	},
	drawerIconContainer: {
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	drawerIcon: {
		height: "40px",
		width: "40px",
	},
	drawer: {
		backgroundColor: theme.palette.common.arcGreen,
	},
	drawerItem: {
		...theme.typography.tab,
		opacity: 0.7,
	},
	drawerItemSelected: {
		"& .MuiListItemText-root": {
			opacity: 1,
		},
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.arcOrange,
	},
	appbar: {
		zIndex: theme.zIndex.modal + 1,
	},
}));

const Header = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const [openDrawer, setOpenDrawer] = useState(false);
	const [index, setIndex] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const indexHandler = (e, idx) => {
		setIndex(idx);
	};

	const handleHover = (e) => {
		setAnchorEl(e.currentTarget);
		setOpenMenu(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpenMenu(false);
	};

	const handleMenuItemClick = (event, index) => {
		setAnchorEl(null);
		setOpenMenu(false);
		setSelectedIndex(index);
	};

	const menuOptions = [
		{ name: "Services", link: "/services", selectedIndex: 0 },
		{
			name: "Custom Software Development",
			link: "/customsoftware",
			selectedIndex: 1,
		},
		{
			name: "Mobile App Development",
			link: "/mobiledevelopment",
			selectedIndex: 2,
		},
		{ name: "Website Development", link: "/webdevelopment", selectedIndex: 3 },
	];

	const routes = [
		{ name: "Home", link: "/", activeIndex: 0 },
		{
			name: "Services",
			link: "/services",
			activeIndex: 1,
			aria_owns: anchorEl ? "simple-menu" : undefined,
			aria_haspopup: anchorEl ? true : undefined,
			onMouseOver: (e) => handleHover(e),
		},
		{ name: "The Revolution", link: "/revolution", activeIndex: 2 },
		{ name: "About Us", link: "/about", activeIndex: 3 },
		{ name: "Contact Us", link: "/contact", activeIndex: 4 },
	];

	useEffect(() => {
		[...menuOptions, ...routes].forEach((route) => {
			if (
				route.activeIndex !== undefined &&
				route.link === window.location.pathname &&
				index !== route.activeIndex
			) {
				setIndex(route.activeIndex);
				if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
					setSelectedIndex(route.selectedIndex);
				}
			}
		});
	}, [index, selectedIndex, menuOptions, routes]);

	const tabs = (
		<React.Fragment>
			<Tabs
				value={index}
				onChange={indexHandler}
				className={classes.tabContainer}
				indicatorColor="primary"
			>
				{routes.map((route) => (
					<Tab
						key={`${route.activeIndex}`}
						className={classes.tab}
						component={Link}
						to={route.link}
						label={route.name}
						aria-owns={route.aria_owns}
						aria-haspopup={route.aria_haspopup}
						onMouseOver={route.onMouseOver}
					/>
				))}
			</Tabs>
			<Button
				onClick={() => setIndex(5)}
				variant="contained"
				color="secondary"
				className={classes.button}
				component={Link}
				to="/estimate"
			>
				{" "}
				Free Estimate{" "}
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				MenuListProps={{ onMouseLeave: handleClose }}
				classes={{ paper: classes.menu }}
				elevation={0}
				keepMounted
				style={{ zIndex: 1302 }}
			>
				{menuOptions.map((option, _index) => (
					<MenuItem
						key={`${option}${_index}`}
						component={Link}
						to={option.link}
						classes={{ root: classes.menuItem }}
						onClick={(event) => {
							handleMenuItemClick(event, _index);
							setIndex(1);
							handleClose();
						}}
						selected={_index === selectedIndex && index === 1}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);

	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List disablePadding>
					{routes.map((route) => (
						<ListItem
							key={`${route.activeIndex}`}
							onClick={() => {
								setOpenDrawer(false);
								setIndex(0);
							}}
							divider
							button
							component={Link}
							to={route.link}
							selected={index === route.activeIndex}
							classes={{ selected: classes.drawerItemSelected }}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}
					<ListItem
						onClick={() => {
							setOpenDrawer(false);
							setIndex(5);
						}}
						divider
						button
						component={Link}
						to="/estimate"
						classes={{
							root: classes.drawerItemEstimate,
							selected: classes.drawerItemSelected,
						}}
						selected={index === 5}
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Free Estimate
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);
	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary" className={classes.appbar}>
					<Toolbar disableGutters={true}>
						{" "}
						<Button
							className={classes.buttonContainer}
							onClick={() => setIndex(0)}
							component={Link}
							to="/"
							disableRipple
						>
							<img className={classes.logo} alt="Company Logo" src={logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
