import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";
import ClubNavigator from "../clubs/ClubNavigator";

type ChatParams = {
	ChatList: undefined;
	Chat: { id: string; title: string; role: string };
	ClubNavigator: { title: string };
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

		<Stack.Screen
			name="ClubNavigator"
			component={ClubNavigator}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

export default ChatNavigator;
