import React from "react";
import { Button } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import ClubNavigator from "../clubs/ClubNavigator";
import EventNavigator from "../events/EventNavigator";

export type ProfileParamList = {
	Profile: undefined;
	Settings: undefined;
	ClubNavigator: { title: string };
	Event: {
		id: string;
		title: string;
		role: string;
	};
};
const Stack = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => (
	<Stack.Navigator
		initialRouteName="Profile"
		screenOptions={{
			headerBackTitleVisible: false,
		}}
	>
		<Stack.Screen
			name="Profile"
			component={ProfileScreen}
			options={({ navigation }) => ({
				title: "My Profile",
				headerRight: () => (
					<Button
						onPress={() => navigation.navigate("Settings")}
						accessoryLeft={SettingsIcon}
						appearance="ghost"
					/>
				),
			})}
		/>
		<Stack.Screen
			name="Settings"
			component={ProfileSettingsScreen}
			options={{ title: "Profile Settings" }}
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
			name="Event"
			component={EventNavigator}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

const SettingsIcon = () => <MaterialIcons name="settings" size={20} />;

export default ProfileNavigator;
