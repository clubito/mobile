import React, { useEffect, useState } from "react";

import AuthNavigator from "../screens/auth/AuthNavigator";
import SplashScreen from "../screens/SplashScreen";
import MainNavigator from "./MainNavigator";

import { AuthContext } from "../context/AuthContext";
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

    const authContext = React.useMemo(() => {
		return {
			signInSuccess: () => {
				setState({
					isLoading: false,
					isLoggedIn: true,
				});
			},
		};
	}, []);

	if (state.isLoading) {
		return <SplashScreen />;
	}

	return (
		<AuthContext.Provider value={authContext}>
			{state.isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
		</AuthContext.Provider>
	);
};

export default RootNavigator;
