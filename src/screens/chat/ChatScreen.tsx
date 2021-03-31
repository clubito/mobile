import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Avatar, Divider, Layout, List } from "@ui-kitten/components";
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

	if (isLoading) {
		return (
			<Layout style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<Layout>
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
});

export default ChatScreen;
