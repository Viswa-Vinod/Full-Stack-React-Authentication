import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route } from "react-router-dom";
import reduxThunk from "redux-thunk";
import history from "./history";
import { AUTH_USER } from "./actions/types";

import App from "./components/app";
import Signin from "./components/auth/Signin";
import Signout from "./components/auth/Signout";
import Signup from "./components/auth/Signup";
import Feature from "./components/Feature";

import RequireAuth from "./components/auth/RequireAuth";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");
if (token) {
	//update the app state
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Route path="/" component={App} />
				<Route path={"/signin"} component={Signin} />
				<Route path={"/signout"} component={Signout} />
				<Route path={"/signup"} component={Signup} />
				<Route path={"/feature"} component={RequireAuth(Feature)} />
			</div>
		</Router>
	</Provider>,
	document.querySelector(".container")
);
