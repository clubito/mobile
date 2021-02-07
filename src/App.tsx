import React from "react";

import { registerRootComponent } from "expo";

import MainTabNavigator from "./navigation/MainTabNavigator";

function App() {
	return (
		<>
			<MainTabNavigator />
		</>
	);
}

export default registerRootComponent(App);
