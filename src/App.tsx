import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import RootNavigator from "./navigation/RootNavigator";

function App() {
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
