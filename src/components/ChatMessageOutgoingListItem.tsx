import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "@ui-kitten/components";
import { ChatMessage } from "../types";

interface Props {
	message: ChatMessage;
}

const ChatMessageOutgoingListItem = (props: Props) => {
	const { message } = props;

	return (
		<View style={styles.messageContainer}>
			<View style={styles.space} />

			<View style={styles.textContainer}>
				<Text style={styles.body}>{message.body}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		flexDirection: "row",
		marginTop: 16,
	},
	textContainer: {
		flex: 10,
		alignItems: "flex-end",
	},
	body: {
		color: "white",
		backgroundColor: "green",
		borderRadius: 15,
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	space: {
		flex: 2,
	},
});

export default ChatMessageOutgoingListItem;
