import React from "react";
import { Button } from "@ui-kitten/components";
import {
	createStackNavigator,
	HeaderBackButton,
} from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import ClubScreen from "../clubs/ClubScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Club } from "../../types";

type ProfileParamList = {
	Profile: { refresh?: boolean };
	Settings: undefined;
	Club: { clubId: string; clubName: string };
};
const Stack = createStackNavigator<ProfileParamList>();

const SearchNavigator = () => (
	<Stack.Navigator
		initialRouteName="Profile"
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
			options={({ navigation }) => ({
				title: "Profile Settings",
				headerLeft: () => (
					<HeaderBackButton
						onPress={() => navigation.goBack({ refresh: true })}
					/>
				),
			})}
		/>
		<Stack.Screen
			name="Club"
			component={ClubScreen}
			options={({ route }) => ({ title: route.params.clubName })}
		/>
	</Stack.Navigator>
);

const SettingsIcon = () => (
	<MaterialIcons name="settings" size={20} color="white" />
);
export default SearchNavigator;
