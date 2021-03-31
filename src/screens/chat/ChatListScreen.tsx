import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Button,
	FlatList,
	StyleSheet,
	Text,
	TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Divider,
	Icon,
	IndexPath,
	Input,
	Layout,
	Select,
	SelectItem,
} from "@ui-kitten/components";
import { ChatThread } from "../../types";
import ChatService from "../../services/ChatService";
import ChatListItem from "../../components/ChatListItem";
import { useNavigation } from "@react-navigation/native";

// let date: Date = new Date();
// var ChatList = [];

// for (let i = 0; i < 3; i++) {
//     ChatList.push(
//         {
//             clubId: i.toString(),
//             clubName: "443h bois",
//             clubLogo: "../../assets/background.png",
//             messages: ["watch Ted Lasso it's great"],
//         }
//     )
// }

const ChatListScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [chatThreads, setChatThreads] = useState([] as ChatThread[]);
    
    useEffect(() => {
        handleChatThreads();
    }, [])

    const handleChatThreads = () => {
        setIsLoading(true);
        ChatService.getAllChatThreads()
            .then((chatThreadList) => {
                setChatThreads(chatThreadList);
            })
            .finally(() => setIsLoading(false));
    };

    if (isLoading) {
		return (
			<Layout style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

    return (
        <Layout style={styles.container}>
            <SafeAreaView edges={["top"]} />

            <FlatList
				data={chatThreads}
				keyExtractor={(item) => item.clubId}
				keyboardDismissMode="on-drag"
				contentContainerStyle={styles.chatList}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => (
					<ChatListItem
						chatThread={item}
						onPress={() =>
							navigation.navigate("ChatNavigator", {
								title: item.clubName,
								screen: "ChatScreen",
								params: {
									id: item.clubId,
									title: item.clubName, 
									role: item.role,
								},
							})
						}
					/>
				)}
			/>       
        </Layout>

    )
}

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