import * as Yup from "yup";

class ForgotPasswordModel {
	constructor(readonly email: string) {}

	static empty(): ForgotPasswordModel {
		return new ForgotPasswordModel("");
	}
}

const ForgotPasswordSchema = Yup.object().shape({
	email: Yup.string()
		.email("Enter a valid email address")
		.required("Enter an email address"),
});

export { ForgotPasswordModel, ForgotPasswordSchema };
