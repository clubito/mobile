import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import ClubNavigator from "../clubs/ClubNavigator";

type SearchParamList = {
	Search: undefined;
	ClubNavigator: { title: string };
};
const Stack = createStackNavigator<SearchParamList>();

const SearchNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Search"
			component={SearchScreen}
			options={{ headerShown: false }}
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

export default SearchNavigator;
