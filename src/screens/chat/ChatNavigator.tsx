import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";

type ChatParams = {
	ChatList: undefined;
	Chat: { id: string; title: string; role: string };
};

const Stack = createStackNavigator<ChatParams>();

const ChatNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="ChatList" component={ChatListScreen} />

		<Stack.Screen
			name="Chat"
			component={ChatScreen}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

export default ChatNavigator;
