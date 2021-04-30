import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ImageBackground, ScrollView } from "react-native";
import EventService from "../../services/EventService";
import { ContainerStyles } from "../../styles/CommonStyles";
import { EventParamList } from "./EventNavigator";
import { Club, Event, Role, User } from "../../types";
import { Text, Button } from "@ui-kitten/components";
import ClubService from "../../services/ClubService";
import ClubListItem from "../../components/ClubListItem";
import MemberList from "../../components/MemberList";
import LoadingScreen from "../../components/LoadingScreen";
import { ArrowRightIcon, EditIcon } from "../../components/Icons";
import CoolDivider from "../../components/CoolDivider";
import EventDetails from "../../components/EventDetails";
import { hasPermission, RolePermissions } from "../../utils/permissions";

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
	const [userRole, setUserRole] = useState({} as Role);
	const [isRSVP, setRSVP] = useState(false);
	const [users, setUsers] = useState({} as User[]);
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
				setRSVP(data.isRsvp);
				navigation.setOptions({ title: data.name });
				ClubService.getClub(data.clubId)
					.then((clubData) => {
						setClub(clubData);
						setUserRole(clubData.role);
						EventService.getRSVPMembers(props.route.params.id)
							.then((data) => {
								setUsers(data);
								setLoading(false);
							})
							.catch((error) => {
								if (toast)
									toast.show(error.message, {
										type: "danger",
									});
								setLoading(false);
							});
					})
					.catch((error) => {
						if (toast)
							toast.show(error.message, {
								type: "danger",
							});
						setLoading(false);
					});
			})
			.catch((error) => {
				if (toast)
					toast.show(error.message, {
						type: "danger",
					});
				setLoading(false);
			});
	};

	if (event === null || loading) {
		return <LoadingScreen />;
	}

	if (hasPermission(userRole, RolePermissions.ADD_EDIT_EVENTS)) {
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

	const handleRSVP = () => {
		if (!isRSVP)
			EventService.eventRSVP(props.route.params.id)
				.then((data) => {
					if (toast)
						toast.show(data.message, {
							type: "success",
						});
					pullData();
				})
				.catch((error) => {
					if (toast)
						toast.show(error.message, {
							type: "danger",
						});
				});
		else
			EventService.cancelRSVP(props.route.params.id)
				.then((data) => {
					if (toast)
						toast.show(data.message, {
							type: "success",
						});
					pullData();
				})
				.catch((error) => {
					if (toast)
						toast.show(error.message, {
							type: "danger",
						});
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

	const members = (
		<>
			<CoolDivider />

			<View>
				<Text
					category="s2"
					appearance="hint"
					style={{ marginHorizontal: 16, marginTop: 16 }}
				>
					RSVPs
				</Text>

				<MemberList
					members={users}
					emptyText="No RSVPs"
					accessoryRight={ArrowRightIcon}
					yup
				/>
			</View>
		</>
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
				<EventDetails
					startTime={event.startTime}
					endTime={event.endTime}
					description={event.description}
					shortLocation={event.shortLocation}
					footer={members}
				/>
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
