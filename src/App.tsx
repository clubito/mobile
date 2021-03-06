import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import RootNavigator from "./navigation/RootNavigator";
import { ThemeContext } from "./context/ThemeContext";
import Toast from "react-native-fast-toast";

const AppDarkTheme = {
	...DarkTheme,
	...eva["dark"],
};

const AppLightTheme = {
	...DefaultTheme,
	...eva["light"],
};

const App = () => {
	const [theme, setTheme] = React.useState("light");

	useEffect(() => {
		AsyncStorage.getItem("setting_dark_mode_enabled").then((state) => {
			const currTheme = state === "true" ? "dark" : "light";
			setTheme(currTheme);
		});
	}, []);

	const toggleTheme = () => {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
	};

	return (
		<NavigationContainer
			theme={theme === "dark" ? AppDarkTheme : AppLightTheme}
		>
			{StatusBar.setBarStyle(
				theme === "dark" ? "light-content" : "dark-content",
				true
			)}
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ApplicationProvider
					{...eva}
					theme={theme == "dark" ? AppDarkTheme : AppLightTheme}
				>
					<RootNavigator />
				</ApplicationProvider>
				<Toast ref={(ref) => (global["toast"] = ref)} />
			</ThemeContext.Provider>
		</NavigationContainer>
	);
};

export default registerRootComponent(App);
