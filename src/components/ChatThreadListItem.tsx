import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { ChatThread } from "../types";

interface Props {
	chatThread: ChatThread;
	onPress: () => void;
}

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ChatThreadListItem = (props: Props) => {
	const { chatThread, onPress } = props;
	const threadHasMessages =
		chatThread.messages.length > 0 && chatThread.messages[0].length > 0;

	const formatTime = (date: string) => {
		if (dayjs(date).isToday()) {
			return dayjs(date).format("hh:mm A");
		} else if (dayjs(date).isYesterday()) {
			return "Yesterday";
		} else {
			return dayjs(date).format("MM/DD/YY");
		}
	};

	return (
		<ListItem
			style={styles.container}
			onPress={onPress}
			title={() => (
				<Text style={styles.title} category="s1">
					{chatThread.clubName}
				</Text>
			)}
			description={() => (
				<Text appearance="hint" style={styles.desc} numberOfLines={1}>
					{threadHasMessages
						? (chatThread.messages[0][0].isSelf
								? "You"
								: chatThread.messages[0][0].authorName) +
						  ": " +
						  chatThread.messages[0][0].body
						: "No messages yet"}
				</Text>
			)}
			accessoryLeft={() => (
				<Avatar
					source={{ uri: chatThread.clubLogo }}
					style={styles.avatar}
				/>
			)}
			accessoryRight={() => (
				<Text appearance="hint" numberOfLines={1}>
					{threadHasMessages
						? formatTime(chatThread.messages[0][0].timestamp)
						: ""}
				</Text>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
        backgroundColor: "transparent"
	},
	avatar: {
		marginRight: 5,
		height: 45,
		width: 45,
	},
	title: {
		marginLeft: 8,
		fontSize: 16,
	},
	desc: {
		marginLeft: 8,
		fontSize: 14,
	},
});

export default ChatThreadListItem;
