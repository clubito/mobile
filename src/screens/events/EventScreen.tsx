import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useState } from "react";
import {
	ActivityIndicator,
	SafeAreaView,
	View,
	Image,
	ImageBackground,
} from "react-native";
import EventService from "../../services/EventService";
import { ContainerStyles } from "../../styles/CommonStyles";
import { EventParamList } from "./EventNavigator";
import { Event } from "../../types";
import { Text, Layout, Card, Button, Avatar } from "@ui-kitten/components";

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

	const getReadableDate = (d: Date) => {
		if (typeof d === "string") {
			d = new Date(d);
		}
		return (
			String(
				d.toLocaleDateString([], {
					year: "2-digit",
					month: "2-digit",
					day: "2-digit",
				})
			) +
			" " +
			String(
				d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
			)
		);
	};

	if (event === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<View style={ContainerStyles.extraMargin}>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 10,
					}}
				>
					<ImageBackground
						style={{ height: 200, width: "100%" }}
						source={{ uri: event.picture }}
					/>
				</View>
				<Card style={ContainerStyles.lowerMargin}>
					<Text category="s1" style={{ textAlign: "center" }}>
						{getReadableDate(event.startTime)} to{" "}
						{getReadableDate(event.endTime)}
					</Text>
				</Card>
				<Button onPress={() => {}} style={ContainerStyles.lowerMargin}>
					{"RSVP to " + event.name}
				</Button>
				<Card style={ContainerStyles.lowerMargin}>
					<Text>
						<b>Description:</b> {event.description}
					</Text>
				</Card>
			</View>
		</SafeAreaView>
	);
};

export default EventScreen;
