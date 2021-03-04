import * as Yup from "yup";

class LoginModel {
	constructor(readonly email: string, readonly password: string) {}

	static empty(): LoginModel {
		return new LoginModel("", "");
	}
}

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Enter a valid email address")
		.required("Enter an email address"),
	password: Yup.string().required("Enter a password"),
});

export { LoginModel, LoginSchema };
