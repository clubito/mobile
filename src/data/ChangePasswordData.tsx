import * as Yup from "yup";

class ChangePasswordModel {
	constructor(readonly curPassword: string, readonly password: string) {}

	static empty(): ChangePasswordModel {
		return new ChangePasswordModel("", "");
	}
}

const ChangePasswordSchema = Yup.object().shape({
	curPassword: Yup.string().required("Enter your previous password"),
	password: Yup.string().required("Enter a new password"),
	confirmPassword: Yup.string().test(
		"passwords-match",
		"Passwords must match",
		function (value) {
			return this.parent.password === value;
		}
	),
});

export { ChangePasswordModel, ChangePasswordSchema };
