import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { TextStyle } from "../../styles/CommonStyles";

const HomeScreen = () => {
	// TODO: testing only, remove once notifications work
	setTimeout(()=> {
		AsyncStorage.getItem("test_notif_token").then((t) => alert(t!));
	}, 1000);
	
	return (
		<View style={TextStyle.center}>
			<Text>Home Screen</Text>
		</View>
	);
};

export default HomeScreen;
