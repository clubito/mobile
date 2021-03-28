import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import EventListScreen from "./EventListScreen";
import EventScreen from "./EventScreen";
import { Button } from "@ui-kitten/components";

export type EventParamList = {
	EventList: undefined;
	Event: { id: string; title: string; role: string };
};
const Stack = createStackNavigator<EventParamList>();

const EventNavigator = () => (
	<Stack.Navigator
		screenOptions={{
			headerStyle: {
				backgroundColor: "#5c5c5c",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerTitleAlign: "center",
			headerBackTitleVisible: false,
		}}
	>
		<Stack.Screen name="EventList" component={EventListScreen} />
		<Stack.Screen
			name="Event"
			component={EventScreen}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

export default EventNavigator;
