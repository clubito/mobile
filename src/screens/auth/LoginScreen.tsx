import React from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import { LoginModel, LoginSchema } from "../../data/LoginData";
import FormInput from "../../components/FormInput";
import FormSecureInput from "../../components/FormSecureInput";
import LoadingScreen from "../../components/LoadingScreen";

const LoginScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const { signInSuccess } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const savedModel = React.useRef(LoginModel.empty());
	const [submitted, setSubmitted] = React.useState(false);
	const [responseError, setResponseError] = React.useState();

	const login = (model: LoginModel) => {
		savedModel.current = model;
		setIsLoading(true);

		AuthService.login(model.email, model.password)
			.then((profileSetup) => signInSuccess(profileSetup))
			.catch((error) => setResponseError(error.message))
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Layout style={ContainerStyles.flexContainer}>
			<Formik
				initialValues={savedModel.current}
				validationSchema={LoginSchema}
				onSubmit={login}
				validateOnChange={submitted}
			>
				{({ handleSubmit }) => (
					<Layout style={ContainerStyles.center}>
						<FormInput
							id="email"
							label="Email"
							style={styles.input}
						/>

						<FormSecureInput
							id="password"
							label="Password"
							style={styles.input}
						/>

						<Button
							style={styles.input}
							onPress={() => {
								setSubmitted(true);
								handleSubmit();
							}}
						>
							Login
						</Button>

						<Text style={TextStyle.error}>{responseError!}</Text>
					</Layout>
				)}
			</Formik>

			<Layout style={styles.buttonRow}>
				<Button
					appearance="ghost"
					style={styles.button}
					onPress={() => navigation.navigate("Forgot Password")}
				>
					Forgot Password
				</Button>

				<Button
					appearance="ghost"
					style={styles.button}
					onPress={() => navigation.navigate("Signup")}
				>
					Signup
				</Button>
			</Layout>
		</Layout>
	);
};

const styles = StyleSheet.create({
	button: {
		marginStart: 10,
		marginEnd: 10,
	},
	buttonRow: {
		alignContent: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	input: {
		width: 300,
		marginBottom: 15,
	},
});

export default LoginScreen;
