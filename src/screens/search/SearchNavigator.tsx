import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import { Button } from "react-native";
import ClubScreen from "../clubs/ClubScreen";
import ClubSettings from "../clubs/ClubSettings";
import { MaterialIcons } from "@expo/vector-icons";

type SearchParamList = {
	Club: { clubId: string; clubName: string; role: string };
	ClubSettings: { clubId: string };
};
const Stack = createStackNavigator<SearchParamList>();

const SearchNavigator = () => (
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
		<Stack.Screen name="Search" component={SearchScreen} />
		<Stack.Screen
			name="Club"
			component={ClubScreen}
			options={({ navigation, route }) => ({
				title: route.params.clubName,
				headerRight: () => {
					return route.params.role === "OFFICER" ||
						route.params.role === "OWNER" ? (
						<Button
							onPress={() =>
								navigation.navigate("ClubSettings", {
									clubId: route.params.clubId,
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
			component={ClubSettings}
			options={{ title: "Club Settings" }}
		/>
	</Stack.Navigator>
);

const SettingsIcon = () => (
	<MaterialIcons name="settings" size={20} color="white" />
);

export default SearchNavigator;
