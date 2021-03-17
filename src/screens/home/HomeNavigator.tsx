import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import NotificationNavigator from "../notifications/NotificationNavigator";

const Stack = createStackNavigator();

const HomeNavigator = () => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="Home" component={HomeScreen} />
		<Stack.Screen
			name="NotificationNavigator"
			component={NotificationNavigator}
		/>
	</Stack.Navigator>
);

export default HomeNavigator;
