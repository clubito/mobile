import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Avatar, Button, Input, Layout, List } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { ChatMessage, ChatThread, User } from "../../types";
import ChatService from "../../services/ChatService";
import UserService from "../../services/UserService";
import ChatMessageIncomingListItem from "../../components/ChatMessageIncomingListItem";
import ChatMessageOutgoingListItem from "../../components/ChatMessageOutgoingListItem";
import ChatMessageDate from "../../components/ChatMessageDate";
import EmptyView from "../../components/EmptyView";

type ChatParamList = {
	Chat: { id: string };
};

type ChatRouteProp = RouteProp<ChatParamList, "Chat">;

type Props = {
	route: ChatRouteProp;
};

const ChatScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isLoading, setIsLoading] = useState(true);
	const [messageText, setMessageText] = useState("");
	const user = useRef({} as User);
	const [chatThread, setChatThread] = useState({} as ChatThread);
	const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
	const listRef = useRef<List>(null);

	useEffect(() => {
		Promise.all([
			UserService.getCurrentUser(),
			ChatService.getChatThread(props.route.params.id),
		])
			.then((result: [User, ChatThread]) => {
				user.current = result[0];
				result[1].messages.reverse();
				setChatThread(result[1]);
			})
			.finally(() => {
				ChatService.addSubscriber(
					props.route.params.id,
					handleNewMessage
				);
				setIsLoading(false);
			});
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

	const sendMessage = () => {
		handleMessageInputChange("");
		handleNewMessage({
			authorId: user.current.id,
			authorName: user.current.name,
			authorPicture: user.current.profilePicture,
			timestamp: new Date().toString(),
			body: messageText,
			isSelf: true,
			isDate: false,
		});
		ChatService.sendMessage(props.route.params.id, messageText);
	};

	const handleNewMessage = (newMessage: ChatMessage) => {
		setChatThread((prevThread) => {
			if (user.current.id === newMessage.authorId)
				newMessage.isSelf = true;

			const messages = prevThread.messages;
			const lastMessageArray = messages[0];
			let lastMessage;
			
			if (lastMessageArray) {
				 lastMessage = lastMessageArray[lastMessageArray.length - 1];
			}

			if (lastMessage?.authorId === newMessage.authorId) {
				lastMessageArray.push(newMessage);
			} else {
				messages.unshift([newMessage]);
			}

			return {
				...prevThread,
				messages: messages,
			};
		});
	};

	const handleMessageInputChange = (text: string) => {
		setMessageText(text);
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
				{chatThread.messages.length > 0 && chatThread.messages[0].length > 0 ? (
					<List
						inverted={true}
						ref={listRef}
						style={styles.messageList}
						data={chatThread.messages}
						// onContentSizeChange={() =>
						// 	listRef.current?.scrollToEnd({
						// 		animated: true,
						// 	})
						// }
						onLayout={() =>
							listRef.current?.scrollToIndex({
								index: 0,
								animated: true,
							})
						}
						keyboardDismissMode="on-drag"
						keyExtractor={(item, index) => {
							return (
								item[0].body +
								item[0].authorId +
								item[0].timestamp
							);
						}}
						renderItem={({ item }) => {
							return item[0].isDate ? (
								<ChatMessageDate date={item[0].timestamp} />
							) : item[0].isSelf ? (
								<ChatMessageOutgoingListItem messages={item} />
							) : (
								<ChatMessageIncomingListItem messages={item} />
							);
						}}
					/>
				) : (
					<EmptyView message="Be the first to chat!" />
				)}
			</Layout>

			<KeyboardAvoidingView
				keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
				style={styles.inputContainer}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<Layout style={styles.inputInner}>
					<Input
						style={styles.messageInput}
						value={messageText}
						onChangeText={handleMessageInputChange}
						returnKeyType="send"
						onSubmitEditing={() => {
							if (!sendButtonDisabled) sendMessage();
						}}
					/>
					<Button
						appearance="ghost"
						style={styles.sendButton}
						onPress={sendMessage}
						disabled={sendButtonDisabled}
						accessoryLeft={() => (
							<MaterialIcons
								name="send"
								size={24}
								color={
									sendButtonDisabled ? "#9E9E9E" : "#FC7572"
								}
							/>
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
	messageList: {
		paddingHorizontal: 16,
		backgroundColor: "transparent",
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
		borderRadius: 20,
		borderColor: "#EEEEEE",
		backgroundColor: "#F5F5F5",
	},
	sendButton: {
		marginRight: 4,
		paddingHorizontal: -5,
		paddingVertical: -5,
		width: 32,
		height: 32,
		backgroundColor: "transparent",
	},
});

export default ChatScreen;
