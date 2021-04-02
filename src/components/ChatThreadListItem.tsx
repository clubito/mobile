import { Avatar, Button, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import dayjs from "dayjs";
import { ChatThread } from "../types";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

interface Props {
	chatThread: ChatThread;
	onPress: () => void;
}

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ChatThreadListItem = (props: Props) => {
	const { chatThread, onPress } = props;

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
			onPress={onPress}
			title={() => (
				<Text style={styles.title} category="s1">
					{chatThread.clubName}
				</Text>
			)}
			description={() => (
				<Text appearance="hint" style={styles.desc} numberOfLines={1}>
					{chatThread.messages[0][0].authorName}:{" "}
					{chatThread.messages[0][0].body}
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
					{formatTime(chatThread.messages[0][0].timestamp)}
				</Text>
			)}
		/>
	);
};

const styles = StyleSheet.create({
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
