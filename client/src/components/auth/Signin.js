import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signin extends React.Component {
	handleFormSubmit({ email, password }) {
		//need to log user in

		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		//console.log('props in Signin', this.props);
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email: </label>
					<Field
						name="email"
						component="input"
						type="email"
						className="form-control"
					/>
				</fieldset>
				<fieldset className="form-group">
					<label>Password: </label>
					<Field
						name="password"
						component="input"
						type="password"
						className="form-control"
					/>
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">
					Sign In
				</button>
			</form>
		);
	}
}

function mapstateToProps(state) {
	return { errorMessage: state.auth.error };
}

const formConfig = {
	form: "signin", //name of form where form properties will be placed in appl state
	fields: ["email", "password"] //field names should match data structure in backend
};

Signin = reduxForm(formConfig)(Signin);

export default (Signin = connect(mapstateToProps, actions)(Signin));
