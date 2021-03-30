import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import ClubScreen from "./ClubScreen";
import ClubSettingsScreen from "./ClubSettingsScreen";
import AddEventScreen from "./AddEventScreen";
import { Button } from "@ui-kitten/components";
import AddAnnouncementScreen from "./AddAnnouncement";

export type ClubParamList = {
	Club: { id: string; title: string; role: string };
	ClubSettings: { clubId: string };
	AddEvent: { clubId: string; eventId?: string };
	AddAnnouncement: { clubId: string; eventId?: string };
};

const Stack = createStackNavigator<ClubParamList>();

const ClubNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Club"
			component={ClubScreen}
			options={({ navigation, route }) => ({
				title: route.params.title,
				headerRight: () => {
					return route.params.role === "OFFICER" ||
						route.params.role === "OWNER" ? (
						<Button
							onPress={() =>
								navigation.navigate("ClubSettings", {
									clubId: route.params.id,
								})
							}
							accessoryLeft={SettingsIcon}
							appearance="ghost"
						/>
					) : null;
				},
			})}
		/>
		<Stack.Screen
			name="ClubSettings"
			component={ClubSettingsScreen}
			options={{ title: "Club Settings" }}
		/>
		<Stack.Screen
			name="AddEvent"
			component={AddEventScreen}
			options={{ title: "Add Event" }}
		/>
		<Stack.Screen
			name="AddAnnouncement"
			component={AddAnnouncementScreen}
			options={{ title: "Add Announcement" }}
		/>
		{/* <Stack.Screen name="EventNavigator" component={EventNavigator} /> */}
	</Stack.Navigator>
);

const SettingsIcon = () => <MaterialIcons name="settings" size={20} />;

export default ClubNavigator;
