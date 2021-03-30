import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import {
	Text,
	Card,
	Layout,
	Button,
	Popover,
	Menu,
	MenuItem,
} from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Announcement, Club, Event } from "../../types";
import ClubService from "../../services/ClubService";
import GeneralModal from "../../components/GeneralModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AnnouncementList from "./AnnouncementList";
import EventTab from "./EventTab";
import { ClubParamList } from "./ClubNavigator";

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
	const navigation = useNavigation();
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [addVisible, setAddVisible] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [error, setError] = React.useState(false);

	useEffect(() => {
		if (clubInfo === null) {
			ClubService.getClub(props.route.params.id).then((data) => {
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

	const renderToggleButton = () => (
		<Button
			style={{ position: "absolute", bottom: 10, right: 10 }}
			onPress={() => setAddVisible(true)}
		>
			+
		</Button>
	);

	const addAnEvButton =
		clubInfo.role === "OWNER" ||
		clubInfo.role === "OFFICER" ||
		clubInfo.role === "MEMBER" ? (
			<Popover
				anchor={renderToggleButton}
				visible={addVisible}
				placement={"top end"}
				onBackdropPress={() => setAddVisible(false)}
			>
				<Menu>
					<MenuItem
						title="Add Announcement"
						onPress={() => {
							setAddVisible(false);
							navigation.navigate("AddAnnouncement", {
								clubId: clubInfo.id,
							});
						}}
					/>
					<MenuItem
						title="Add Event"
						onPress={() => {
							setAddVisible(false);
							navigation.navigate("AddEvent", {
								clubId: clubInfo.id,
							});
						}}
					/>
				</Menu>
			</Popover>
		) : null;
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
						component={EventTab}
						initialParams={{ eventList: clubInfo.events }}
						options={{ title: "Events" }}
					/>
				</Tab.Navigator>
			</View>
			{addAnEvButton}
		</SafeAreaView>
	);
};
export default ClubScreen;
