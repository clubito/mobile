import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import { ContainerStyles } from "../styles/CommonStyles";
import Colors from "../styles/colors";
import CoolView from "./CoolView";

interface Props {
	message: string;
}

const EmptyView = (props: Props) => {
	const { message } = props;

	return (
		<CoolView style={[ContainerStyles.center, styles.container]}>
			<FontAwesome5 name="sad-tear" size={32} color={Colors.primary} />
			<Text style={styles.title} category="s1">
				Oh... it's looking a little lonely in here
			</Text>
			<Text appearance="hint">{message}</Text>
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
	},
	title: {
		color: Colors.secondary,
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
