import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import NotificationService from "../../services/NotificationService";
import CoolView from "../../components/CoolView";
import TimelineList from "../../components/Timeline";

const HomeScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		NotificationService.setNavigator(navigation);
	}, []);

	return (
		<CoolView safe>
			<TimelineList />
		</CoolView>
	);
};

export default HomeScreen;
