import React, { useEffect } from "react";
import NotificationService from "../../services/NotificationService";
import { Text, View } from "react-native";
import { TextStyle } from "../../styles/CommonStyles";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		NotificationService.setNavigator(navigation);
	}, []);

	return (
		<View style={TextStyle.center}>
			<Text>Home Screen</Text>
		</View>
	);
};

export default HomeScreen;
