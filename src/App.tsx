import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import RootNavigator from "./navigation/RootNavigator";

function App() {
	return (
		<NavigationContainer>
			{StatusBar.setBarStyle("dark-content", true)}
			<ApplicationProvider {...eva} theme={eva.light}>
				<RootNavigator />
			</ApplicationProvider>
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
