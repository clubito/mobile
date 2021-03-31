import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";

const Stack = createStackNavigator();

const ChatNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="ChatListScreen" component={ChatListScreen} />
		<Stack.Screen name="ChatScreen" component={ChatScreen} />
	</Stack.Navigator>
);

export default ChatNavigator;
