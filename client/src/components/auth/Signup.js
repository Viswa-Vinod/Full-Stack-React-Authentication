import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<div>
		<label>{label}</label>
		<div>
			<input
				{...input}
				placeholder={label}
				type={type}
				className="form-control"
			/>
			{touched &&
				((error && <span className="error">{error}</span>) ||
					(warning && <span>{warning}</span>))}
		</div>
	</div>
);

class Signup extends Component {
	handleFormSubmit(formProps) {
		//call action creator to sign up the user
		this.props.signupUser(formProps);
	}

	renderAlert() {
		if (this.props.errorMessage)
			return (
				<div className="alert alert-danger">
					<strong>Oops! </strong>
					{this.props.errorMessage}
				</div>
			);
	}
	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<Field
						name="email"
						component={renderField}
						type="email"
						label="Email"
					/>
				</fieldset>
				<fieldset className="form-group">
					<Field
						name="password"
						type="password"
						component={renderField}
						label="Password"
					/>
				</fieldset>
				<fieldset className="form-group">
					<Field
						name="passwordConfirm"
						component={renderField}
						type="password"
						label="Confirm Password:"
					/>
				</fieldset>
				{this.renderAlert()}
				<button className="btn btn-primary" action="submit">
					{" "}
					Sign Up
				</button>
			</form>
		);
	}
}

const formConfig = {
	form: "signup",
	fields: ["email", "password", "passwordConfirm "],
	validate
};

function validate(formProps) {
	const errors = {};
	if (formProps.password !== formProps.passwordConfirm) {
		errors.password = "Passwords must match";
	}

	if (!formProps.email) errors.email = "Please enter an email";
	if (!formProps.password) errors.password = "Please enter a password";
	if (!formProps.passwordConfirm)
		errors.passwordConfirm = "Please enter a password confirmation";

	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error
	};
}
Signup = reduxForm(formConfig)(Signup);

export default (Signup = connect(mapStateToProps, actions)(Signup));
