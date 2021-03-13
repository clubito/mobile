import React from "react";
import { Button } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import ClubNavigator from "../clubs/ClubNavigator";

type ProfileParamList = {
	Profile: undefined;
	Settings: undefined;
	ClubNavigator: { title: string };
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
			options={{ title: "Profile Settings" }}
		/>
		<Stack.Screen
			name="ClubNavigator"
			component={ClubNavigator}
			options={({ route }) => ({
				title: route.params.title,
			})}
		/>
	</Stack.Navigator>
);

const SettingsIcon = () => (
	<MaterialIcons name="settings" size={20} color="white" />
);
export default SearchNavigator;
