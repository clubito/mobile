import React, { createContext, useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import SplashScreen from "../screens/SplashScreen";
import MainNavigator from "./MainNavigator";

const Stack = createStackNavigator();

export const AuthContext = createContext({});

const InitNavigator = () => {
	const [state, setState] = useState({
		isLoading: true,
	});

	useEffect(() => {
		setTimeout(() => {
			setState({
				isLoading: false,
			});
		}, 2000);
	}, []);

	if (state.isLoading) {
		return <SplashScreen />;
	}

	let isLoggedIn = true;
	return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default InitNavigator;
