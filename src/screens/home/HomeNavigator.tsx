import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import NotificationNavigator from "../notifications/NotificationNavigator";
import ClubNavigator from "../clubs/ClubNavigator";
import EventScreen from "../events/EventScreen";
import ProfileScreen from "../profile/ProfileScreen";

type HomeParams = {
	Home: undefined;
	NotificationNavigator: undefined;
	Event: { id: string; title: string; role: string };
	ClubNavigator: { title: string };
	Profile: { userId?: string };
};

const Stack = createStackNavigator<HomeParams>();

const HomeNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Home"
			component={HomeScreen}
			options={() => ({
				headerShown: false,
			})}
		/>
		<Stack.Screen
			name="NotificationNavigator"
			component={NotificationNavigator}
		/>
		<Stack.Screen
			name="ClubNavigator"
			component={ClubNavigator}
			options={({ route }) => ({
				title: route.params.title,
				headerShown: false,
			})}
		/>
		<Stack.Screen
			name="Profile"
			component={ProfileScreen}
			options={{ title: "Profile" }}
		/>
		<Stack.Screen
			name="Event"
			component={EventScreen}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

export default HomeNavigator;
