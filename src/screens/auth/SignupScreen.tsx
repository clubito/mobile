import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Layout } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { ContainerStyles } from "../../styles/CommonStyles";
import UserService from "../../services/UserService";
import NotifyScreen from "../../components/NotifyScreen";
import LoadingScreen from "../../components/LoadingScreen";

const SignupScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccessful, setIsSuccessful] = React.useState(false);

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [secureText, setSecureText] = React.useState(true);

	const signup = () => {
		setIsLoading(true);
		UserService.signup(email, password)
			.then(() => setIsSuccessful(true))
			.catch(() => {})
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

	if (isSuccessful) {
		return <NotifyScreen message="Click on link in verification email" />;
	}

	return (
		<Layout style={ContainerStyles.center}>
			<Input
				placeholder="Email"
				label="Email"
				value={email}
				style={styles.input}
				onChangeText={(text) => setEmail(text)}
			/>
			<Input
				placeholder="Password"
				label="Password"
				value={password}
				style={styles.input}
				onChangeText={(text) => setPassword(text)}
				accessoryRight={visibleIcon}
				secureTextEntry={secureText}
			/>
			<Input
				placeholder="Confirm Password"
				label="Confirm Password"
				value={confirmPassword}
				style={styles.input}
				onChangeText={(text) => setConfirmPassword(text)}
				accessoryRight={visibleIcon}
				secureTextEntry={secureText}
			/>
			<Button style={styles.input} onPress={() => signup()}>
				Signup
			</Button>
		</Layout>
	);
};

const styles = StyleSheet.create({
	input: {
		width: 300,
		marginBottom: 15,
	},
});

export default SignupScreen;
