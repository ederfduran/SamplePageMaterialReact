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
	},
	logo: {
		height: "8em",
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
}));

const Header = (props) => {
	const classes = useStyles();
	const [index, setIndex] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);

	const indexHandler = (e, idx) => {
		setIndex(idx);
	};

	const handleHover = (e) => {
		setAnchorEl(e.currentTarget);
		setOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	useEffect(() => {
		if (window.location.pathname === "/" && index !== 0) {
			setIndex(0);
		} else if (window.location.pathname === "/services" && index !== 1) {
			setIndex(1);
		} else if (window.location.pathname === "/revolution" && index !== 2) {
			setIndex(2);
		} else if (window.location.pathname === "/about" && index !== 3) {
			setIndex(3);
		} else if (window.location.pathname === "/contact" && index !== 4) {
			setIndex(4);
		} else if (window.location.pathname === "/estimate" && index !== 4) {
			setIndex(5);
		}
	}, [index]);

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary">
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
						<Tabs
							value={index}
							onChange={indexHandler}
							className={classes.tabContainer}
							indicatorColor="primary"
						>
							<Tab
								className={classes.tab}
								component={Link}
								to="/"
								label="Home"
							></Tab>
							<Tab
								aria-owns={anchorEl ? "simple-menu" : undefined}
								aria-haspopup={anchorEl ? true : undefined}
								className={classes.tab}
								component={Link}
								onMouseOver={(e) => handleHover(e)}
								to="/services"
								label="Services"
							></Tab>
							<Tab
								className={classes.tab}
								component={Link}
								to="revolution"
								label="The Revolution"
							></Tab>
							<Tab
								className={classes.tab}
								component={Link}
								to="about"
								label="About Us"
							></Tab>
							<Tab
								className={classes.tab}
								component={Link}
								to="contact"
								label="Contact Us"
							></Tab>
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
							open={open}
							onClose={handleClose}
							MenuListProps={{ onMouseLeave: handleClose }}
							classes={{ paper: classes.menu }}
							elevation={0}
						>
							<MenuItem
								onClick={() => {
									handleClose();
									setIndex(1);
								}}
								component={Link}
								to="/services"
								classes={{ root: classes.menuItem }}
							>
								Services
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
									setIndex(1);
								}}
								component={Link}
								to="/customsoftware"
								classes={{ root: classes.menuItem }}
							>
								Custom Software Development
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
									setIndex(1);
								}}
								component={Link}
								to="/mobiledevelopment"
								classes={{ root: classes.menuItem }}
							>
								Mobile App Development
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
									setIndex(1);
								}}
								component={Link}
								to="/webdevelopment"
								classes={{ root: classes.menuItem }}
							>
								Website Development
							</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
