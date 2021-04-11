import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text } from "@ui-kitten/components";
import NotificationService from "../../services/NotificationService";
import CoolView from "../../components/CoolView";
import { TextStyle } from "../../styles/CommonStyles";

const HomeScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		NotificationService.setNavigator(navigation);
	}, []);

	return (
		<CoolView style={TextStyle.center}>
			<Text>Home Screen</Text>
		</CoolView>
	);
};

export default HomeScreen;
