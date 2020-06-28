import React from "react";
import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./ui/theme";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/" component={() => <div>Home</div>} />
						<Route
							exact
							path="/services"
							component={() => <div>services</div>}
						/>
						<Route
							exact
							path="/revolution"
							component={() => <div>The Revolution</div>}
						/>
						<Route exact path="/about" component={() => <div>About us</div>} />
						<Route
							exact
							path="/contact"
							component={() => <div>Contact us</div>}
						/>
						<Route
							exact
							path="/estimate"
							component={() => <div>Free estimate</div>}
						/>
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
