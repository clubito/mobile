import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClubScreen from "./ClubScreen";
import ClubSettingsScreen from "./settings/ClubSettingsScreen";
import ManageApplicationsScreen from "./settings/ManageApplicationsScreen";
import ManageRolesScreen from "./settings/ManageRolesScreen";
import ManageMembersScreen from "./settings/ManageMembersScreen";
import AddEventScreen from "../events/AddEventScreen";
import ProfileScreen from "../profile/ProfileScreen";
import { Button } from "@ui-kitten/components";
import AddAnnouncementScreen from "./AddAnnouncement";
import EventScreen from "../events/EventScreen";
import { SettingsIcon } from "../../components/Icons";

export type ClubParamList = {
	Club: { id: string; title: string; role: string };
	ClubSettings: { clubId: string };
	ManageApplications: { clubId: string };
	ManageMembers: { clubId: string };
	ManageRoles: { clubId: string };
	AddEvent: { clubId: string; eventId?: string };
	AddAnnouncement: { clubId: string; announcementId?: string };
	Profile: { userId?: string };
	Event: {
		id: string;
		title: string;
		role: string;
	};
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
					return route.params.role === "OWNER" ||
						route.params.role === "OFFICER" ? (
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
			options={{ title: "Settings" }}
		/>

		<Stack.Screen
			name="ManageApplications"
			component={ManageApplicationsScreen}
			options={{ title: "Manage Applications" }}
		/>

		<Stack.Screen
			name="ManageMembers"
			component={ManageMembersScreen}
			options={{ title: "Manage Members" }}
		/>

		<Stack.Screen
			name="ManageRoles"
			component={ManageRolesScreen}
			options={{ title: "Manage Roles" }}
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

		<Stack.Screen
			name="Profile"
			component={ProfileScreen}
			options={{ title: "Profile" }}
		/>

		<Stack.Screen name="Event" component={EventScreen} />
	</Stack.Navigator>
);

export default ClubNavigator;
