import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import dayjs from "dayjs";

interface Props {
	date: string;
}

const ChatMessageDate = (props: Props) => {
	const { date } = props;

	return (
		<View style={styles.dateContainer}>
			<Text appearance="hint">{dayjs(date).format("MMMM D")}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	dateContainer: {
		borderRadius: 10,
		backgroundColor: "#EEE",
		alignContent: "center",
		alignSelf: "center",
		padding: 5,
		marginTop: 16,
	},
});

export default ChatMessageDate;
