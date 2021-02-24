import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import RootNavigator from "./navigation/RootNavigator";

function App() {
	return (
		<NavigationContainer>
			<ApplicationProvider {...eva} theme={eva.light}>
				<RootNavigator />
			</ApplicationProvider>
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
