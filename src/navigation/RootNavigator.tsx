import React, { useEffect, useState } from "react";

import AuthNavigator from "../screens/auth/AuthNavigator";
import SplashScreen from "../screens/SplashScreen";
import MainNavigator from "./MainNavigator";

import UserService from "../services/UserService";

const RootNavigator = () => {
	const [state, setState] = useState({
		isLoading: true,
		isLoggedIn: false,
	});

	useEffect(() => {
		if (state.isLoading)
			UserService.isAnyoneLoggedIn().then((loggedIn) =>
				setState({
					isLoading: false,
					isLoggedIn: loggedIn,
				})
			);
	});

	if (state.isLoading) {
		return <SplashScreen />;
	}

	return state.isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
