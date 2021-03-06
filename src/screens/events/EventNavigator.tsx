import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventListScreen from "./EventListScreen";
import EventScreen from "./EventScreen";
import ClubNavigator from "../clubs/ClubNavigator";
import AddEventScreen from "./AddEventScreen";
import ProfileScreen from "../profile/ProfileScreen";
import { Role } from "../../types";

export type EventParamList = {
	EventList: undefined;
	Event: { id: string; title: string; role: Role };
	ClubNavigator: { title: string };
	AddEvent: { clubId: string; eventId?: string };
	Profile: { userId?: string };
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
		<Stack.Screen
			name="AddEvent"
			component={AddEventScreen}
			options={{ title: "Add Event" }}
		/>
		<Stack.Screen
			name="Profile"
			component={ProfileScreen}
			options={{ title: "Profile" }}
		/>
	</Stack.Navigator>
);

export default EventNavigator;
