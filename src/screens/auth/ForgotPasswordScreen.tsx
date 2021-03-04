import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Layout } from "@ui-kitten/components";
import { ContainerStyles } from "../../styles/CommonStyles";
import UserService from "../../services/UserService";
import LoadingScreen from "../../components/LoadingScreen";
import NotifyScreen from "../../components/NotifyScreen";

const ForgotPasswordScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccessful, setIsSuccessful] = React.useState(false);

	const [email, setEmail] = React.useState("");

	const login = () => {
		setIsLoading(true);
		UserService.forgotPassword(email)
			.then(() => setIsSuccessful(true))
			.catch(() => {})
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isSuccessful) {
		return <NotifyScreen message="Click on link in email" />;
	}

	return (
		<Layout style={ContainerStyles.center}>
			<Input
				placeholder="Email"
				label="Email"
				value={email}
				style={styles.input}
				onChangeText={(nameUpdate) => setEmail(nameUpdate)}
			/>
			<Button style={styles.input} onPress={() => login()}>
				Forgot Password
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

export default ForgotPasswordScreen;
