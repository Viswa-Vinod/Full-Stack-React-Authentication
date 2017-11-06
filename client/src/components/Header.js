import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends React.Component {
	renderLinks() {
		if (this.props.authenticated) {
			//show a link to signout
			return (
				<li className="nav-item">
					<Link className="nav-link" to="/signout">
						Sign Out{" "}
					</Link>
				</li>
			);
		} else {
			//show a link to signin or signup
			return [
				<li className="nav-item" key={1}>
					<Link className="nav-link" to="/signin">
						Sign In
					</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link to="/signup" className="nav-link">
						{" "}
						Sign Up{" "}
					</Link>{" "}
				</li>
			];
		}
	}
	render() {
		return (
			<nav className="navbar navbar-light">
				<Link to="/" className="navbar-brand">
					Redux Auth
				</Link>
				<ul className="nav navbar-nav">{this.renderLinks()}</ul>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}
export default connect(mapStateToProps)(Header);
