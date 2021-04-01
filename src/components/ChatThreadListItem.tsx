import { Avatar, Button, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { ChatThread } from "../types";

interface Props {
	chatThread: ChatThread;
	onPress: () => void;
}

const ChatThreadListItem = (props: Props) => {
	function formatAMPM() {
		const timestamp = new Date(props.chatThread.messages[0].timestamp);
		var hours = timestamp.getHours();
		var minutes = timestamp.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		var minutesStr = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutesStr + " " + ampm;
		return strTime;
	}

	return (
		<ListItem
			onPress={props.onPress}
			title={() => (
				<Text style={styles.title} category="s1">
					{props.chatThread.clubName}
				</Text>
			)}
			description={() => (
				<Text appearance="hint" style={styles.desc} numberOfLines={1}>
					{props.chatThread.messages[0].authorName}:{" "}
					{props.chatThread.messages[0].body}
				</Text>
			)}
			accessoryLeft={() => (
				<Avatar
					source={{ uri: props.chatThread.clubLogo }}
					style={styles.avatar}
				/>
			)}
			accessoryRight={() => (
				<Text appearance="hint" numberOfLines={1}>
					{formatAMPM()}
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
