import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import { ChatMessage } from "../types";

interface Props {
	messages: ChatMessage[];
}

const ChatMessageOutgoingListItem = (props: Props) => {
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
		<View style={styles.groupContainer}>
			{messages.map((message, index) => (
				<View
					style={styles.messageContainer}
					key={index + message.timestamp}
				>
					<View style={styles.space} />

					<View style={styles.textContainer}>
						<View style={resolveBorderStyling(index)}>
							<Text style={styles.bodyText}>{message.body}</Text>
							<Text style={styles.bodyTime}>
								{dayjs(message.timestamp).format("hh:mm A")}
							</Text>
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	groupContainer: {
		marginTop: 16,
	},
	messageContainer: {
		flexDirection: "row",
		marginBottom: 2,
	},
	textContainer: {
		flex: 10,
		alignItems: "flex-end",
	},
	body: {
		color: "white",
		backgroundColor: "#FC7572",
		padding: 8,
		overflow: "hidden",
		marginBottom: 2,
	},
	bodyBorderFirst: {
		borderTopStartRadius: 15,
		borderTopEndRadius: 15,
		borderBottomStartRadius: 15,
	},
	bodyBorderMiddle: {
		borderTopEndRadius: 15,
		borderBottomEndRadius: 15,
	},
	bodyBorderLast: {
		borderTopStartRadius: 15,
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

export default ChatMessageOutgoingListItem;
