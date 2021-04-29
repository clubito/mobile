import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";
import ClubNavigator from "../clubs/ClubNavigator";
import { Role } from "../../types";

type ChatParams = {
	ChatList: undefined;
	Chat: { id: string; title: string; role: Role };
	ClubNavigator: { title: string };
};

const Stack = createStackNavigator<ChatParams>();

const ChatNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="ChatList"
			component={ChatListScreen}
			options={() => ({
				title: "Chats",
			})}
		/>

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
				headerShown: false,
			})}
		/>
	</Stack.Navigator>
);

export default ChatNavigator;
