import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { ContainerStyles } from "../../styles/CommonStyles";
import { AuthContext } from "../../context/AuthContext";
import UserService from "../../services/UserService";
import { LoginModel, LoginSchema } from "../../data/LoginData";
import FormInput from "../../components/FormInput";
import LoadingScreen from "../../components/LoadingScreen";

const LoginScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const { signInSuccess } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const savedModel = React.useRef(LoginModel.empty());
	const [submitted, setSubmitted] = React.useState(false);
	const [secureText, setSecureText] = React.useState(true);

	const login = (model: LoginModel) => {
		savedModel.current = model;
		setIsLoading(true);

		UserService.login(model.email, model.password)
			.then(() => signInSuccess())
			.catch((error) => {})
			.finally(() => setIsLoading(false));
	};

	const visibleIcon = () => (
		<TouchableWithoutFeedback onPress={() => setSecureText(!secureText)}>
			<MaterialIcons
				name={secureText ? "visibility" : "visibility-off"}
				size={20}
			/>
		</TouchableWithoutFeedback>
	);

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
					<>
						<Layout style={ContainerStyles.center}>
							<FormInput
								id="email"
								label="Email"
								style={styles.input}
							/>
							<FormInput
								id="password"
								label="Password"
								style={styles.input}
								accessoryRight={visibleIcon}
								secureTextEntry={secureText}
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
						</Layout>
					</>
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
