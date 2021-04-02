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
	ScrollView,
} from "react-native";
import EventService from "../../services/EventService";
import { ContainerStyles } from "../../styles/CommonStyles";
import { EventParamList } from "./EventNavigator";
import { Club, Event } from "../../types";
import { Text, Layout, Card, Button, Icon } from "@ui-kitten/components";
import ClubService from "../../services/ClubService";
import ClubListItem from "../../components/ClubListItem";
import { getReadableDate } from "../../utils";

type EventScreenRouteProp = RouteProp<EventParamList, "Event">;
type EventScreenNavigationProp = StackNavigationProp<EventParamList, "Event">;

type Props = {
	route: EventScreenRouteProp;
	navigation: EventScreenNavigationProp;
};

const EventScreen = (props: Props) => {
	const [event, setEventInfo] = useState<Event | null>(null);
	const [loading, setLoading] = useState(true);
	const [club, setClub] = useState({} as Club);
	const [isOfficer, setIsOfficer] = useState(false);
	const [isRSVP, setRSVP] = useState(false);
	const navigation = useNavigation<StackNavigationProp<any>>();

	useEffect(() => {
		if (event === null) {
			pullData();
		}
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			pullData();
		});
		return unsubscribe;
	}, [navigation]);

	const pullData = () => {
		EventService.getEvent(props.route.params.id)
			.then((data) => {
				setEventInfo(data);
				setRSVP(data.rsvpStatus || data.rsvpStatus === false);
				ClubService.getClub(data.clubId)
					.then((clubData) => {
						setClub(clubData);
						setIsOfficer(
							clubData.role === "OFFICER" ||
								clubData.role === "OWNER"
						);
						setLoading(false);
					})
					.catch((error) => {
						//TODO ADD toasts
						setLoading(false);
						console.log(error);
					});
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	};

	if (event === null || loading) {
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

	const handleRSVP = () => {
		if (!isRSVP)
			EventService.eventRSVP(props.route.params.id)
				.then((data) => {
					console.log(data);
					pullData();
				})
				.catch((error) => {
					//TODO: Set toasts
					console.log(error);
				});
		else
			EventService.cancelRSVP(props.route.params.id)
				.then((data) => {
					console.log(data);
					pullData();
				})
				.catch((error) => {
					//TODO: Set toasts
					console.log(error);
				});
	};

	const rsvpButton = (
		<Button
			status={isRSVP ? "warning" : "primary"}
			onPress={handleRSVP}
			style={ContainerStyles.lowerMargin}
		>
			{(isRSVP ? "Cancel RSVP" : "RSVP") + " to " + event.name}
		</Button>
	);

	return (
		<SafeAreaView
			style={[ContainerStyles.flexContainer, ContainerStyles.extraMargin]}
		>
			<ScrollView>
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
				{rsvpButton}
				<Card style={ContainerStyles.upperMargin}>
					<Text category="s1" style={{ textAlign: "center" }}>
						{getReadableDate(event.startTime)} to{" "}
						{getReadableDate(event.endTime)}
					</Text>
				</Card>
				<Card style={ContainerStyles.upperMargin}>
					<Text>
						<Text style={{ fontWeight: "bold" }}>
							Description:{" "}
						</Text>
						{event.description}
					</Text>
					{event.shortLocation ? (
						<Text style={ContainerStyles.upperMargin}>
							<Text style={{ fontWeight: "bold" }}>
								Location:{" "}
							</Text>
							{event.shortLocation}
						</Text>
					) : null}
				</Card>
			</ScrollView>

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
				style={{ position: "absolute", bottom: 0 }}
			/>
		</SafeAreaView>
	);
};

export default EventScreen;
