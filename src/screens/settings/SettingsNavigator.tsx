import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import CreateClubScreen from "./CreateClubScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="Settings" component={SettingsScreen} />

		<Stack.Screen
			name="NotificationSettings"
			component={NotificationSettingsScreen}
			options={{ title: "Notification Settings" }}
		/>
		<Stack.Screen
			name="CreateClub"
			component={CreateClubScreen}
			options={{ title: "Create Club" }}
		/>
	</Stack.Navigator>
);

export default SettingsNavigator;
