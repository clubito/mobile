import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Layout } from "@ui-kitten/components";
import { ContainerStyles } from "../../styles/CommonStyles";
import UserService from "../../services/UserService";

const ForgotPasswordScreen = () => {
	const [email, setEmail] = React.useState("");

	const login = () => {
		UserService.forgotPassword(email)
			.then(() => {})
			.catch(() => {});
	};

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
