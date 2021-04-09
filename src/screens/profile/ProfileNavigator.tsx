import React from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import ClubNavigator from "../clubs/ClubNavigator";
import SettingsScreen from "../settings/SettingsScreen";

export type ProfileParamList = {
	Profile: undefined;
	EditProfile: undefined;
	Settings: undefined;
	ClubNavigator: { title: string };
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
					<View style={{ flexDirection: "row" }}>
						<Button
							onPress={() => navigation.navigate("EditProfile")}
							accessoryLeft={EditIcon}
							appearance="ghost"
						/>
						<Button
							onPress={() => navigation.navigate("Settings")}
							accessoryLeft={SettingsIcon}
							appearance="ghost"
						/>
					</View>
				),
			})}
		/>

		<Stack.Screen
			name="EditProfile"
			component={EditProfileScreen}
			options={{ title: "Edit Profile" }}
		/>

		<Stack.Screen name="Settings" component={SettingsScreen} />

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

const EditIcon = () => <MaterialIcons name="edit" size={20} />;

const SettingsIcon = () => <MaterialIcons name="settings" size={20} />;

export default ProfileNavigator;
