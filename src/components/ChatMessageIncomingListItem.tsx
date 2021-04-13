import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import { ChatMessage } from "../types";
import Colors from "../styles/Colors";

interface Props {
	messages: ChatMessage[];
}

const ChatMessageIncomingListItem = (props: Props) => {
	const { messages } = props;

	const resolveBorderStyling = (index: Number) => {
		return index === 0
			? index === messages.length - 1
				? [styles.body, styles.bodyBorderFirst, styles.bodyBorderLast]
				: [styles.body, styles.bodyBorderFirst]
			: index === messages.length - 1
			? [styles.body, styles.bodyBorderLast]
			: [styles.body, styles.bodyBorderMiddle];
	};

	return (
		<View style={styles.messageContainer}>
			<View style={styles.avatarContainer}>
				<Avatar
					source={{ uri: messages[0].authorPicture }}
					style={styles.avatar}
				/>
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.name} category="s2" appearance="hint">
					{messages[0].authorName}
				</Text>

				{messages.map((message, index) => (
					<View
						style={resolveBorderStyling(index)}
						key={index + message.timestamp}
					>
						<Text style={styles.bodyText}>{message.body}</Text>
						<Text style={styles.bodyTime}>
							{dayjs(message.timestamp).format("hh:mm A")}
						</Text>
					</View>
				))}
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
		backgroundColor: Colors.secondary,
		padding: 8,
		overflow: "hidden",
		marginBottom: 2,
	},
	bodyBorderFirst: {
		borderTopStartRadius: 15,
		borderTopEndRadius: 15,
		borderBottomEndRadius: 15,
	},
	bodyBorderMiddle: {
		borderTopEndRadius: 15,
		borderBottomEndRadius: 15,
	},
	bodyBorderLast: {
		borderTopEndRadius: 15,
		borderBottomStartRadius: 15,
		borderBottomEndRadius: 15,
	},
	bodyText: {
		color: "white",
	},
	bodyTime: {
		color: "white",
		alignSelf: "flex-end",
		fontSize: 12,
	},
	space: {
		flex: 2,
	},
});

export default ChatMessageIncomingListItem;
