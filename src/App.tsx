import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import RootNavigator from "./navigation/RootNavigator";
import NotificationService from "./services/NotificationService";

function App() {
	// TODO: testing only, remove once notifications work
	NotificationService.registerDevice();
	
	return (
		<NavigationContainer>
			{StatusBar.setBarStyle("dark-content", true)}
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<RootNavigator />
			</ApplicationProvider>
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
