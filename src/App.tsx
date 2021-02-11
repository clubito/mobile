import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigation/RootNavigator";

function App() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
