import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="Signup" component={SignupScreen} />
		<Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
	</Stack.Navigator>
);

export default AuthNavigator;
