import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem, Text } from "@ui-kitten/components";
import { ChatMessage } from "../types";

interface Props {
	message: ChatMessage;
}

const ChatMessageListItem = (props: Props) => {
	const { message } = props;
	return (
		<ListItem
			title={message.authorName}
			description={message.body}
			accessoryLeft={() => (
				<Avatar
					source={{ uri: message.authorPicture }}
					style={{ marginRight: 5, height: 25, width: 25 }}
				/>
			)}
			accessoryRight={() => (
				<Text appearance="hint" numberOfLines={1}>
					{message.timestamp.getDate()}
				</Text>
			)}
		/>
	);
};

const styles = StyleSheet.create({

});

export default ChatMessageListItem;
