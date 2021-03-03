import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Layout } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { ContainerStyles } from "../../styles/CommonStyles";
import UserService from "../../services/UserService";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [secureText, setSecureText] = React.useState(true);

	const login = () => {
		UserService.login(email, password)
			.then(() => {})
			.catch(() => {});
	};

	const visibleIcon = () => (
		<TouchableWithoutFeedback onPress={() => setSecureText(!secureText)}>
			<MaterialIcons
				name={secureText ? "visibility" : "visibility-off"}
				size={20}
			/>
		</TouchableWithoutFeedback>
	);

	return (
		<Layout style={ContainerStyles.flexContainer}>
			<Layout style={ContainerStyles.center}>
				<Input
					placeholder="Email"
					label="Email"
					value={email}
					style={styles.input}
					onChangeText={(nameUpdate) => setEmail(nameUpdate)}
				/>
				<Input
					placeholder="Password"
					label="Password"
					value={password}
					style={styles.input}
					onChangeText={(passUpdate) => setPassword(passUpdate)}
					accessoryRight={visibleIcon}
					secureTextEntry={secureText}
				/>
				<Button style={styles.input} onPress={() => login()}>
					Login
				</Button>
			</Layout>

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
