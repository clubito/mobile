import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text } from "@ui-kitten/components";
import NotificationService from "../../services/NotificationService";
import CoolView from "../../components/CoolView";
import { TextStyle } from "../../styles/CommonStyles";
import Timeline from "../../components/Timeline";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		NotificationService.setNavigator(navigation);
	}, []);

	return (
		<SafeAreaView>
			<Timeline />
		</SafeAreaView>
	);
};

export default HomeScreen;
