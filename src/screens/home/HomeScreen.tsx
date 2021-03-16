import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationService from "../../services/NotificationService";
import { Text, View } from "react-native";
import { TextStyle } from "../../styles/CommonStyles";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
	// TODO: testing only, remove once notifications work
	setTimeout(() => {
		AsyncStorage.getItem("test_notif_token").then((t) => alert(t!));
	}, 1000);

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
