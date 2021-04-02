import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import RootNavigator from "./navigation/RootNavigator";
import Toast from "react-native-fast-toast";

function App() {
	return (
		<NavigationContainer>
			{StatusBar.setBarStyle("dark-content", true)}
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<RootNavigator />
			</ApplicationProvider>
			<Toast ref={(ref) => global['toast'] = ref} />
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
