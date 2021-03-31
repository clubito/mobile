import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";

const Stack = createStackNavigator();

function ChatNavigator() {
    <Stack.Navigator
		screenOptions={{
			headerStyle: {
				backgroundColor: "#5c5c5c",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerTitleAlign: "center",
			headerBackTitleVisible: false,
		}}
	>
            
            <Stack.Screen name = "ChatListScreen" component={ChatListScreen} />
            <Stack.Screen name = "ChatScreen" component={ChatScreen}/>

    </Stack.Navigator>
}

export default ChatNavigator;

