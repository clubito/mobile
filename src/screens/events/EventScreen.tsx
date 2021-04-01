import { RouteProp, useNavigation } from "@react-navigation/native";
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
import { Club, Event } from "../../types";
import { Text, Layout, Card, Button, Icon } from "@ui-kitten/components";
import ClubService from "../../services/ClubService";
import ClubListItem from "../../components/ClubListItem";

type EventScreenRouteProp = RouteProp<EventParamList, "Event">;
type EventScreenNavigationProp = StackNavigationProp<EventParamList, "Event">;

type Props = {
	route: EventScreenRouteProp;
	navigation: EventScreenNavigationProp;
};

const EventScreen = (props: Props) => {
	const [event, setEventInfo] = useState<Event | null>(null);
	const [loading, setLoading] = useState(true);
	const [loading1, setLoading1] = useState(true);
	const [club, setClub] = useState({} as Club);
	const [isOfficer, setIsOfficer] = useState(false);
	const navigation = useNavigation<StackNavigationProp<any>>();

	useEffect(() => {
		if (event === null) {
			EventService.getEvent(props.route.params.id)
				.then((data) => {
					setEventInfo(data);
					//TODO: Change to clubId when backend has been updated
					ClubService.getClub(data.club)
						.then((data) => {
							setClub(data);
							setIsOfficer(
								data.role === "OFFICER" || data.role === "OWNER"
							);
							setLoading(false);
						})
						.catch(() => {
							setLoading(false);
							return <Text>Ha</Text>;
						});
					setLoading1(false);
				})
				.catch(() => {
					setLoading(false);
					setLoading1(false);
				});
		}
	}, []);

	const getReadableDate = (d: string) => {
		const date = new Date(d);
		return (
			String(
				date.toLocaleDateString([], {
					year: "2-digit",
					month: "2-digit",
					day: "2-digit",
				})
			) +
			" " +
			String(
				date.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})
			)
		);
	};

	if (event === null || loading || loading1) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	if (isOfficer) {
		navigation.setOptions({
			headerRight: () => (
				<Button
					onPress={() =>
						navigation.navigate("AddEvent", {
							clubId: club.id,
							eventId: props.route.params.id,
						})
					}
					accessoryLeft={EditIcon}
					appearance="ghost"
				/>
			),
		});
	}
	const EditIcon = () => (
		<Icon name="edit-outline" style={{ width: 20, height: 20 }} />
	);

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
				{/* TODO: Add RSVP function */}
				<Button onPress={() => {}} style={ContainerStyles.lowerMargin}>
					{"RSVP to " + event.name}
				</Button>
				<Card style={ContainerStyles.lowerMargin}>
					<Text>
						<b>Description:</b> {event.description}
					</Text>
				</Card>
				{/* TODO: We gotta put this club link some other way, it looks unwieldy */}
				<ClubListItem
					onPress={() => {
						navigation.push("ClubNavigator", {
							title: club.name,
							screen: "Club",
							params: {
								id: club.id,
								title: club.name,
								role: club.role,
							},
						});
					}}
					club={club}
				/>
			</View>
		</SafeAreaView>
	);
};

export default EventScreen;
