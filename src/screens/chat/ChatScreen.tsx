import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
	Avatar,
	Button,
	Divider,
	Input,
	Layout,
	List,
} from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { ChatThread } from "../../types";
import ChatService from "../../services/ChatService";
import ChatMessageListItem from "../../components/ChatMessageListItem";

type ChatParamList = {
	Chat: { id: string };
};

type ChatRouteProp = RouteProp<ChatParamList, "Chat">;

type Props = {
	route: ChatRouteProp;
};

const ChatScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isLoading, setIsLoading] = useState(false);
	const [chatThread, setChatThread] = useState({} as ChatThread);
	const [sendButtonDisabled, setSendButtonDisabled] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		ChatService.getChatThread(props.route.params.id)
			.then((chatThread) => {
				setChatThread(chatThread);
			})
			.finally(() => setIsLoading(false));
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() =>
						navigation.push("ClubNavigator", {
							title: chatThread.clubName,
							screen: "Club",
							params: {
								id: chatThread.clubId,
								title: chatThread.clubName,
								role: chatThread.role,
							},
						})
					}
				>
					<Avatar
						style={styles.headerLogo}
						size="small"
						source={{ uri: chatThread.clubLogo }}
					/>
				</TouchableOpacity>
			),
		});
	}, [chatThread]);

	const toggleSendButton = (text: string) => {
		if (sendButtonDisabled && text.trim().length > 0) {
			setSendButtonDisabled(false);
		} else if (!sendButtonDisabled && text.trim().length === 0) {
			setSendButtonDisabled(true);
		}
	};

	if (isLoading) {
		return (
			<Layout style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<Layout style={styles.mainContainer}>
			<Layout style={styles.messagesContainer}>
				<List
					data={chatThread.messages}
					keyExtractor={(item) =>
						item.authorId + item.body + item.timestamp
					}
					keyboardDismissMode="on-drag"
					ItemSeparatorComponent={Divider}
					renderItem={({ item }) => (
						<ChatMessageListItem message={item} />
					)}
				/>
			</Layout>
			<KeyboardAvoidingView
				keyboardVerticalOffset={110}
				style={styles.inputContainer}
				behavior="padding"
			>
				<Divider />
				<Layout style={styles.inputInner}>
					<Input
						style={styles.messageInput}
						onChangeText={toggleSendButton}
					/>
					<Button
						appearance="ghost"
						style={[styles.iconButton, styles.sendButton]}
						disabled={sendButtonDisabled}
						accessoryLeft={() => (
							<MaterialIcons name="send" size={24} />
						)}
					/>
				</Layout>
			</KeyboardAvoidingView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	headerLogo: {
		marginRight: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
	mainContainer: {
		flex: 1,
		flexDirection: "column",
	},
	messagesContainer: {
		flex: 10,
	},
	inputContainer: {
		flex: 1,
	},
	inputInner: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		flexDirection: "row",
	},
	messageInput: {
		flex: 1,
		marginHorizontal: 8,
	},
	sendButton: {
		marginRight: 4,
	},
	iconButton: {
		paddingHorizontal: -5,
		paddingVertical: -5,
		width: 32,
		height: 32,
	},
});

export default ChatScreen;
