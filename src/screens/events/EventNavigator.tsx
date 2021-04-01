import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import EventListScreen from "./EventListScreen";
import EventScreen from "./EventScreen";
import { Button } from "@ui-kitten/components";
import ClubNavigator from "../clubs/ClubNavigator";

export type EventParamList = {
	EventList: undefined;
	Event: { id: string; title: string; role: string };
	ClubNavigator: { title: string };
};
const Stack = createStackNavigator<EventParamList>();

const EventNavigator = () => (
	<Stack.Navigator
		screenOptions={{
			headerBackTitleVisible: false,
		}}
	>
		<Stack.Screen
			name="EventList"
			component={EventListScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="Event"
			component={EventScreen}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
		<Stack.Screen
			name="ClubNavigator"
			component={ClubNavigator}
			options={({ route }) => ({
				title: route.params.title,
				headerShown: false,
			})}
		/>
	</Stack.Navigator>
);

export default EventNavigator;