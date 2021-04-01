import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "@ui-kitten/components";
import { ChatMessage } from "../types";

interface Props {
	message: ChatMessage;
}

const ChatMessageListItem = (props: Props) => {
	const { message } = props;
	return (
		<View style={styles.messageContainer}>
			<View style={styles.avatarContainer}>
				<Avatar
					source={{ uri: message.authorPicture }}
					style={styles.avatar}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.name} category="s2" appearance="hint">
					{message.authorName}
				</Text>
				<Text style={styles.body}>{message.body}</Text>
			</View>
			<View style={styles.space} />
		</View>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		flexDirection: "row",
		marginTop: 16,
	},
	avatarContainer: {
		flex: 1,
		justifyContent: "flex-end",
		marginRight: 8,
	},
	avatar: {
		height: 25,
		width: 25,
	},
	textContainer: {
		flex: 10,
		alignItems: "flex-start",
	},
	name: {
		paddingHorizontal: 8,
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

export default ChatMessageListItem;
