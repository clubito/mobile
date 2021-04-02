import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClubNavigator from "../clubs/ClubNavigator";
import ChatNavigator from "../chat/ChatNavigator";
import EventNavigator from "../events/EventNavigator";

type NotificationParams = {
	ClubNavigator: { title: string };
	ChatNavigator: { title: string };
	EventNavigator: { title: string };
};

const Stack = createStackNavigator<NotificationParams>();

const NotificationNavigator = () => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen
			name="ClubNavigator"
			component={ClubNavigator}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>

		<Stack.Screen
			name="ChatNavigator"
			component={ChatNavigator}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>

		<Stack.Screen
			name="EventNavigator"
			component={EventNavigator}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

export default NotificationNavigator;
