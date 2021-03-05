import React from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import AuthService from "../../services/AuthService";
import { SignupModel, SignupSchema } from "../../data/SignupData";
import NotifyScreen from "../../components/NotifyScreen";
import LoadingScreen from "../../components/LoadingScreen";
import FormInput from "../../components/FormInput";
import FormSecureInput from "../../components/FormSecureInput";

const SignupScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccessful, setIsSuccessful] = React.useState(false);

	const savedModel = React.useRef(SignupModel.empty());
	const [submitted, setSubmitted] = React.useState(false);
	const [responseError, setResponseError] = React.useState();

	const signup = (model: SignupModel) => {
		savedModel.current = model;
		setIsLoading(true);

		AuthService.signup(model.email, model.password)
			.then(() => setIsSuccessful(true))
			.catch((error) => setResponseError(error.message))
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isSuccessful) {
		return <NotifyScreen message="Click on link in verification email" />;
	}

	return (
		<Formik
			initialValues={savedModel.current}
			validationSchema={SignupSchema}
			onSubmit={signup}
			validateOnChange={submitted}
		>
			{({ handleSubmit }) => (
				<Layout style={ContainerStyles.center}>
					<Text category="h2" style={styles.title}>
						Sign Up
					</Text>

					<FormInput id="email" label="Email" style={styles.input} />

					<FormSecureInput
						id="password"
						label="Password"
						style={styles.input}
					/>

					<FormSecureInput
						id="confirmPassword"
						label="Confirm Password"
						style={styles.input}
					/>

					<Button
						style={styles.input}
						onPress={() => {
							setSubmitted(true);
							handleSubmit();
						}}
					>
						Submit
					</Button>

					<Text style={TextStyle.error}>{responseError!}</Text>
				</Layout>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	input: {
		width: 300,
		marginBottom: 15,
	},
	title: {
		marginBottom: 30,
	},
});

export default SignupScreen;
