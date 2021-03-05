import React from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import AuthService from "../../services/AuthService";
import {
	ForgotPasswordModel,
	ForgotPasswordSchema,
} from "../../data/ForgotPasswordData";
import LoadingScreen from "../../components/LoadingScreen";
import NotifyScreen from "../../components/NotifyScreen";
import FormInput from "../../components/FormInput";

const ForgotPasswordScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccessful, setIsSuccessful] = React.useState(false);

	const savedModel = React.useRef(ForgotPasswordModel.empty());
	const [submitted, setSubmitted] = React.useState(false);
	const [responseError, setResponseError] = React.useState();

	const forgotPassword = (model: ForgotPasswordModel) => {
		savedModel.current = model;
		setIsLoading(true);

		AuthService.forgotPassword(model.email)
			.then(() => setIsSuccessful(true))
			.catch((error) => setResponseError(error.message))
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isSuccessful) {
		return <NotifyScreen message="Click on link in email" />;
	}

	return (
		<Formik
			initialValues={savedModel.current}
			validationSchema={ForgotPasswordSchema}
			onSubmit={forgotPassword}
			validateOnChange={submitted}
		>
			{({ handleSubmit }) => (
				<Layout style={ContainerStyles.center}>
					<FormInput id="email" label="Email" style={styles.input} />

					<Button
						style={styles.input}
						onPress={() => {
							setSubmitted(true);
							handleSubmit();
						}}
					>
						Forgot Password
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
});

export default ForgotPasswordScreen;
