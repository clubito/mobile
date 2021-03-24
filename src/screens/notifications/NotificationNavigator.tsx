import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClubNavigator from "../clubs/ClubNavigator";

type NotificationParams = {
	ClubNavigator: { title: string };
};

const Stack = createStackNavigator<NotificationParams>();

const NotificationNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="ClubNavigator"
			component={ClubNavigator}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

export default NotificationNavigator;
