import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="Settings" component={SettingsScreen} />

		<Stack.Screen
			name="NotificationSettings"
			component={NotificationSettingsScreen}
			options={{ title: "Notification Settings" }}
		/>
	</Stack.Navigator>
);

export default SettingsNavigator;
