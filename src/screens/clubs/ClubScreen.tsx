import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Layout, Button } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Announcement, Club, Event } from "../../types";
import ClubService from "../../services/ClubService";
import GeneralModal from "../../components/GeneralModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AnnouncementList from "./AnnouncementList";
import EventList from "./EventList";

type ClubParamList = {
	Club: { clubId: string; clubName: string };
};
type ProfileScreenRouteProp = RouteProp<ClubParamList, "Club">;
type ProfileScreenNavigationProp = StackNavigationProp<ClubParamList, "Club">;

type Props = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

export type ClubTabsParamList = {
	AnnouncementList: { announcementList: Announcement[] };
	EventList: { eventList: Event[] };
};

const Tab = createMaterialTopTabNavigator<ClubTabsParamList>();

const ClubScreen = (props: Props) => {
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [error, setError] = React.useState(false);

	useEffect(() => {
		if (clubInfo === null) {
			ClubService.getClub(props.route.params.clubId).then((data) => {
				setClubInfo(data);
				setLoading(false);
			});
		}
	}, []);

	if (clubInfo === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	console.log(clubInfo.role);

	const requestButton =
		clubInfo.role === "OWNER" ||
		clubInfo.role === "OFFICER" ||
		clubInfo.role === "MEMBER" ? null : (
			<Button
				onPress={() => {
					setModalVisible(true);
				}}
			>
				Request to Join Club
			</Button>
		);

	const sendRequest = () => {
		setModalVisible(false);
		ClubService.requestToJoin(clubInfo.id)
			.then((response) => {
				setMessage("Your request has been sent!");
			})
			.catch((error) => {
				setMessage(error.message);
				setError(true);
			});
	};

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<View style={ContainerStyles.horizMargin}>
				<View
					style={{
						width: "100%",
						marginVertical: 10,
					}}
				>
					<Image
						source={{ uri: clubInfo.logo }}
						style={{
							width: 300,
							height: 100,
							resizeMode: "center",
							alignSelf: "center",
						}}
					/>
				</View>
				{requestButton}
				<Card>
					<Text>{clubInfo?.description}</Text>
				</Card>
				{message != "" ? (
					<Card status={error ? "danger" : "success"}>
						<Text>{message}</Text>
					</Card>
				) : null}

				<GeneralModal
					visible={modalVisible}
					closeFunction={() => setModalVisible(false)}
					header={"Would you like to join " + clubInfo.name + "?"}
					functionOnConfirm={sendRequest}
					content={
						"If you wish to join " +
						clubInfo.name +
						", confirm to send a request to the club owners and executives. They will confirm or deny your request."
					}
					modalType={"basic"}
				/>
				<Tab.Navigator>
					<Tab.Screen
						name="AnnouncementList"
						component={AnnouncementList}
						initialParams={{
							announcementList: clubInfo.announcements,
						}}
						options={{ title: "Announcements" }}
					/>
					<Tab.Screen
						name="EventList"
						component={EventList}
						initialParams={{ eventList: clubInfo.events }}
						options={{ title: "Events" }}
					/>
				</Tab.Navigator>
			</View>
		</SafeAreaView>
	);
};
export default ClubScreen;
