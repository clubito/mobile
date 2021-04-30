import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClubScreen from "./ClubScreen";
import ClubSettingsScreen from "./settings/ClubSettingsScreen";
import ManageApplicationsScreen from "./settings/ManageApplicationsScreen";
import ManageRolesScreen from "./settings/ManageRolesScreen";
import ManageMembersScreen from "./settings/ManageMembersScreen";
import AddEditRoleScreen from "./settings/AddEditRoleScreen";
import ModifyMemberScreen from "./settings/ModifyMemberScreen";
import AddEventScreen from "../events/AddEventScreen";
import ProfileScreen from "../profile/ProfileScreen";
import { Button } from "@ui-kitten/components";
import AddAnnouncementScreen from "./AddAnnouncement";
import EventScreen from "../events/EventScreen";
import { GalleryIcon, SettingsIcon } from "../../components/Icons";
import { Role, User } from "../../types";
import { hasClubSettingsPermission } from "../../utils/permissions";
import { View } from "react-native";
import ClubGallery from "./ClubGallery";

export type ClubParamList = {
	Club: { id: string; title: string; role: Role };
	ClubSettings: { clubId: string; role: Role };
	ManageApplications: { clubId: string };
	ManageMembers: { clubId: string };
	ManageRoles: { clubId: string };
	AddEditRole: { clubId: string; role: Role };
	ModifyMember: { clubId: string; user: User };
	AddEvent: { clubId: string; eventId?: string };
	AddAnnouncement: { clubId: string; announcementId?: string };
	Profile: { userId?: string };
	Event: {
		id: string;
		title: string;
		role: Role;
	};
	ClubGallery: { clubId: string };
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
					return hasClubSettingsPermission(route.params.role) ? (
						<View style={{ flexDirection: "row" }}>
							<Button
								onPress={() =>
									navigation.navigate("ClubGallery", {
										clubId: route.params.id,
									})
								}
								accessoryLeft={GalleryIcon}
								appearance="ghost"
							/>
							<Button
								onPress={() =>
									navigation.navigate("ClubSettings", {
										clubId: route.params.id,
										role: route.params.role,
									})
								}
								accessoryLeft={SettingsIcon}
								appearance="ghost"
							/>
						</View>
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
			name="AddEditRole"
			component={AddEditRoleScreen}
			options={({ route }) => ({
				title: route.params.role ? "Edit Role" : "Create Role",
			})}
		/>

		<Stack.Screen
			name="ModifyMember"
			component={ModifyMemberScreen}
			options={{ title: "Member" }}
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
		<Stack.Screen
			name="ClubGallery"
			component={ClubGallery}
			options={{ title: "Gallery" }}
		/>

		<Stack.Screen name="Event" component={EventScreen} />
	</Stack.Navigator>
);

export default ClubNavigator;
