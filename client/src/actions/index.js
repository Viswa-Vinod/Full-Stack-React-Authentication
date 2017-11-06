import axios from "axios";
import history from "../history";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from "./types";

const ROOT_URL = "http://localhost:3090";
export function signinUser({ email, password }) {
	return function(dispatch) {
		//submit email/password to server

		axios
			.post(`${ROOT_URL}/signin`, { email, password })
			.then(res => {
				//if req is good,
				// - update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });

				// - save JWT token
				localStorage.setItem("token", res.data.token);
				// - redirect to '/feature'
				history.push("/feature");
			})
			.catch(() => {
				//if req is bad,
				// - show err to user
				dispatch(authError("Bad Login Info"));
			});
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem("token");
	return {
		type: UNAUTH_USER
	};
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		axios
			.post(`${ROOT_URL}/signup`, { email, password })
			.then(res => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem("token", res.data.token);
				history.push("/feature");
			})
			.catch(err => {
				//console.log(err.response.data.error);
				dispatch(authError(err.response.data.error));
			});
	};
}

export function fetchMessage() {
	return function(dispatch) {
		axios
			.get(ROOT_URL, {
				headers: { authorization: localStorage.getItem("token") }
			})
			.then(res => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: res.data.message
				});
			});
	};
}
