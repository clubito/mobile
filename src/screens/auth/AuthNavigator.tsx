import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="Signup" component={SignupScreen} />
		<Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
	</Stack.Navigator>
);

export default AuthNavigator;
