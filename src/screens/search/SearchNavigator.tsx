import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";

const Stack = createStackNavigator();

const SearchNavigator = () => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="Search" component={SearchScreen} />
	</Stack.Navigator>
);

export default SearchNavigator;
