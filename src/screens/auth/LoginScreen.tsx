import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
			.catch((error) => {
				setResponseError(error.message);
				setIsLoading(false);
			});
	};

	// TODO: testing only, remove once notifications work
	setTimeout(()=> {
		AsyncStorage.getItem("test_notif_token").then((t) => alert(t!));
	}, 1000);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Layout style={{ height: "100%" }}>
			<ImageBackground
				style={styles.appBar}
				source={require("../../assets/background.png")}
			/>

			<Formik
				style={styles.formContainer}
				initialValues={savedModel.current}
				validationSchema={LoginSchema}
				onSubmit={login}
				validateOnChange={submitted}
			>
				{({ handleSubmit }) => (
					<Layout style={styles.form}>
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
							style={styles.forgotPasswordButton}
							size="medium"
							appearance="ghost"
							onPress={() =>
								navigation.navigate("Forgot Password")
							}
						>
							Forgot Password?
						</Button>

						<Button
							style={styles.loginButton}
							onPress={() => {
								setSubmitted(true);
								handleSubmit();
							}}
						>
							Login
						</Button>

						<Text style={TextStyle.error}>{responseError!}</Text>

						<Button
							appearance="ghost"
							onPress={() => navigation.navigate("Signup")}
						>
							Signup for Clubito
						</Button>
					</Layout>
				)}
			</Formik>
		</Layout>
	);
};

const styles = StyleSheet.create({
	loginButton: {
		width: 300,
	},
	input: {
		width: 300,
		marginTop: 15,
	},
	forgotPasswordButton: {
		width: 300,
		justifyContent: "flex-end",
	},
	appBar: {
		height: 300,
	},
	formContainer: {
		flex: 1,
		paddingVertical: 16,
		paddingHorizontal: 16,
	},
	form: {
		paddingVertical: 32,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoginScreen;
