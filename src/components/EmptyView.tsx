import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import { ContainerStyles } from "../styles/CommonStyles";

interface Props {
	message: string;
}

const EmptyView = (props: Props) => {
	const { message } = props;

	return (
		<Layout style={ContainerStyles.center}>
			<FontAwesome5 name="sad-tear" size={32} color="#FC7572" />
			<Text style={styles.title} category="s1">
				Oh... it's looking a little lonely in here
			</Text>
			<Text appearance="hint">{message}</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({
	title: {
		color: "#6A7CF7",
		fontWeight: "600",
		marginTop: 8,
		marginBottom: 2,
	},
	desc: {
		marginLeft: 8,
		fontSize: 14,
	},
});

export default EmptyView;
