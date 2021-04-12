import React, { useEffect, useState } from "react";

import AuthNavigator from "../screens/auth/AuthNavigator";
import SplashScreen from "../screens/SplashScreen";
import MainNavigator from "./MainNavigator";

import { AuthContext } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import NotificationService from "../services/NotificationService";
import ProfileSetupScreen from "../screens/auth/ProfileSetupScreen";

const RootNavigator = () => {
	const [state, setState] = useState({
		isLoading: true,
		isLoggedIn: false,
		isProfileSetup: false,
	});

	useEffect(() => {
		if (state.isLoading)
			setTimeout(() => {
				AuthService.isAnyoneLoggedIn().then((data: boolean[]) =>
					setState({
						isLoading: false,
						isLoggedIn: data[0],
						isProfileSetup: data[1],
					})
				);
			}, 1500);
	});

	const authContext = React.useMemo(() => {
		return {
			signInSuccess: (profileSetup: boolean) => {
				NotificationService.registerDevice();
				setState({
					isLoading: false,
					isLoggedIn: true,
					isProfileSetup: profileSetup,
				});
			},
			logOutSuccess: () => {
				setState({
					isLoading: false,
					isLoggedIn: false,
					isProfileSetup: false,
				});
			},
			profileSetupSuccess: () => {
				setState({
					isLoading: false,
					isLoggedIn: true,
					isProfileSetup: true,
				});
			},
		};
	}, []);

	if (state.isLoading) {
		return <SplashScreen />;
	}

	return (
		<AuthContext.Provider value={authContext}>
			{state.isLoggedIn ? (
				state.isProfileSetup ? (
					<MainNavigator />
				) : (
					<ProfileSetupScreen />
				)
			) : (
				<AuthNavigator />
			)}
		</AuthContext.Provider>
	);
};

export default RootNavigator;
