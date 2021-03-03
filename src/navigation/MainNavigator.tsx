import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import ChatListScreen from "../screens/home/ChatListScreen";
import EventListScreen from "../screens/home/EventListScreen";
import ProfileScreen from "../screens/profile/ProfileNavigator";
import SearchNavigator from "../screens/search/SearchNavigator";

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;

				if (route.name === "Home") {
					iconName = "home" as const;
				} else if (route.name === "Chats") {
					iconName = "chat" as const;
				} else if (route.name === "Events") {
					iconName = "event" as const;
				} else if (route.name === "Profile") {
					iconName = "person" as const;
				} else if (route.name === "Search") {
					iconName = "search" as const;
				}

				return (
					<MaterialIcons name={iconName} size={size} color={color} />
				);
			},
		})}
	>
		<Tab.Screen name="Home" component={HomeScreen} />
		<Tab.Screen name="Chats" component={ChatListScreen} />
		<Tab.Screen name="Events" component={EventListScreen} />
		<Tab.Screen name="Profile" component={ProfileScreen} />
		<Tab.Screen name="Search" component={SearchNavigator} />
	</Tab.Navigator>
);

export default MainNavigator;
