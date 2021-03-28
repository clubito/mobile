import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import EventService from "../../services/EventService";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { EventParamList } from "./EventNavigator";
import { Event } from "../../types";
import { Layout } from "@ui-kitten/components";

type EventScreenRouteProp = RouteProp<EventParamList, "Event">;
type EventScreenNavigationProp = StackNavigationProp<EventParamList, "Event">;

type Props = {
	route: EventScreenRouteProp;
	navigation: EventScreenNavigationProp;
};

const EventScreen = (props: Props) => {
	const [event, setEventInfo] = useState<Event | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (event === null) {
			EventService.getEvent(props.route.params.id).then((data) => {
				setEventInfo(data);
				setLoading(false);
			});
		}
	}, []);

	if (event === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<View style={ContainerStyles.horizMargin}>
				<Text>{event.name}</Text>
			</View>
		</SafeAreaView>
	);
};

export default EventScreen;
