import React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { Icon, Text } from "@ui-kitten/components";

interface ToastProps {
	text: string;
	status: "success" | "failure";
	visible: boolean;
	onDismiss: () => void;
}

const Toast = (props: ToastProps): React.ReactElement => {
	return (
		<Snackbar
			visible={props.visible}
			duration={4000}
			onDismiss={props.onDismiss}
			style={styles.toast}
		>
			<View style={styles.container}>
				<Icon
					name={
						props.status === "success"
							? "checkmark-circle-outline"
							: "close-circle-outline"
					}
					fill={props.status == "success" ? "#4BDD3E" : "#FF3F3F"}
					style={styles.icon}
				/>
				<Text numberOfLines={1} style={styles.text}>
					{props.text}
				</Text>
			</View>
		</Snackbar>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		height: 20,
	},
	toast: {
		backgroundColor: "#424242",
		height: 40,
	},
	icon: {
		height: 20,
		width: 20,
	},
	text: {
		marginLeft: 8,
		color: "#EEEEEE",
	},
});

export default Toast;
