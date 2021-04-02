import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import HomeNavigator from "../screens/home/HomeNavigator";
import ChatNavigator from "../screens/chat/ChatNavigator";
import EventNavigator from "../screens/events/EventNavigator";
import ProfileNavigator from "../screens/profile/ProfileNavigator";
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
					<MaterialIcons name={iconName} size={24} color={color} />
				);
			},
		})}
	>
		<Tab.Screen name="Home" component={HomeNavigator} />
		<Tab.Screen name="Chats" component={ChatNavigator} />
		<Tab.Screen name="Events" component={EventNavigator} />
		<Tab.Screen name="Profile" component={ProfileNavigator} />
		<Tab.Screen name="Search" component={SearchNavigator} />
	</Tab.Navigator>
);

export default MainNavigator;
