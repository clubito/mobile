import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import InitNavigator from "./navigation/InitNavigator";

function App() {
	return (
		<NavigationContainer>
			<InitNavigator />
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
