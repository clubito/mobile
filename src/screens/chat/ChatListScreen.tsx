import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout } from "@ui-kitten/components";
import { ChatThread } from "../../types";
import ChatService from "../../services/ChatService";
import ChatThreadListItem from "../../components/ChatThreadListItem";

const ChatListScreen = () => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [chatThreads, setChatThreads] = useState([] as ChatThread[]);

	useEffect(() => {
		setIsLoading(true);
		ChatService.getAllChatThreads()
			.then((chatThreadList) => {
				setChatThreads(chatThreadList);
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return (
			<Layout style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<Layout style={styles.container}>

			<FlatList
				data={chatThreads}
				keyExtractor={(item) => item.clubId}
				keyboardDismissMode="on-drag"
				contentContainerStyle={styles.chatList}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => (
					<ChatThreadListItem
						chatThread={item}
						onPress={() =>
							navigation.navigate("Chat", {
								title: item.clubName,
								id: item.clubId,
								role: item.role,
							})
						}
					/>
				)}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 8,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
	chatList: {
		flexGrow: 1,
	},
});

export default ChatListScreen;
