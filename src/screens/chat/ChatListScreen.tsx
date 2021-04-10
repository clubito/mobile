import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@ui-kitten/components";
import { ChatThread } from "../../types";
import ChatService from "../../services/ChatService";
import ChatThreadListItem from "../../components/ChatThreadListItem";
import EmptyView from "../../components/EmptyView";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";

const ChatListScreen = () => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [chatThreads, setChatThreads] = useState([] as ChatThread[]);

	useEffect(() => {
		loadThreads();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			loadThreads();
		});
		return unsubscribe;
	}, [navigation]);

	const loadThreads = () => {
		ChatService.go();
		ChatService.getAllChatThreads()
			.then((chatThreadList) => {
				setChatThreads(chatThreadList);
			})
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<CoolView style={styles.listContainer}>
			<FlatList
				ListEmptyComponent={() => (
					<EmptyView message="Join a club or something!" />
				)}
				data={chatThreads}
				keyExtractor={(item) => item.clubId}
				keyboardDismissMode="on-drag"
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
		</CoolView>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
	listContainer: {
		flexGrow: 1,
	},
});

export default ChatListScreen;
