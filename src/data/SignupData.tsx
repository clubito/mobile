import * as Yup from "yup";

class SignupModel {
	constructor(readonly email: string, readonly password: string) {}

	static empty(): SignupModel {
		return new SignupModel("", "");
	}
}

const SignupSchema = Yup.object().shape({
	email: Yup.string()
		.email("Enter a valid email address")
		.required("Enter an email address"),
	password: Yup.string().required("Enter a password"),
	confirmPassword: Yup.string().test(
		"passwords-match",
		"Passwords must match",
		function (value) {
			return this.parent.password === value;
		}
	),
});

export { SignupModel, SignupSchema };
