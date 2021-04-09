import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="Settings" component={SettingsScreen} />
	</Stack.Navigator>
);

export default SettingsNavigator;
