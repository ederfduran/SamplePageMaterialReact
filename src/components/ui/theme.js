import { createMuiTheme } from "@material-ui/core/styles";

const arcGreen = "#94c46e";
const arcOrange = "#ffb300";
const oldColor = "#0b72b9";

export default createMuiTheme({
	palette: {
		common: {
			arcGreen: `${arcGreen}`,
			arcOrange: `${arcOrange}`,
		},
		primary: {
			main: `${arcGreen}`,
		},
		secondary: {
			main: `${arcOrange}`,
		},
	},
	typography: {
		tab: {
			fontFamily: "Raleway",
			textTransform: "none",
			fontWeight: 700,
			fontSize: "1rem",
		},
		estimate: {
			fontFamily: "Pacifico",
			fontSize: "1rem",
			textTransform: "none",
		},
	},
});
