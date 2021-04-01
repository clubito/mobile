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
	IconProps,
	Icon,
} from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Announcement, Club, Event, User } from "../../types";
import ClubService from "../../services/ClubService";
import GeneralModal from "../../components/GeneralModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AnnouncementList from "./AnnouncementList";
import EventTab from "./EventTab";
import { ClubParamList } from "./ClubNavigator";
import MemberTab from "./MemberTab";

type ClubScreenRouteProp = RouteProp<ClubParamList, "Club">;
type ClubScreenNavigationProp = StackNavigationProp<ClubParamList, "Club">;

type Props = {
	route: ClubScreenRouteProp;
	navigation: ClubScreenNavigationProp;
};

export type ClubTabsParamList = {
	AnnouncementList: { announcementList: Announcement[] };
	EventList: { eventList: Event[] };
	Members: {
		members: User[];
		role: string;
		clubId: string;
		update: Function;
	};
};

const Tab = createMaterialTopTabNavigator<ClubTabsParamList>();

const ClubScreen = (props: Props) => {
	const navigation = useNavigation();
	const [addVisible, setAddVisible] = React.useState(false);
	const [clubInfo, setClubInfo] = useState({} as Club);
	const [isLoading, setIsLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);
	const [isMember, setIsMember] = useState(false);

	useEffect(() => {
		refresh();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			refresh();
		});
		return unsubscribe;
	}, [navigation]);

	const refresh = () => {
		setIsLoading(true);
		ClubService.getClub(props.route.params.id).then((data) => {
			setClubInfo(data);
			setIsMember(data.role !== "NONMEMBER");
			setIsLoading(false);
		});
	};

	if (isLoading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const requestButton = isMember ? null : (
		<Button
			disabled={clubInfo.joinRequestStatus.status === "PENDING"}
			onPress={() => {
				setModalVisible(true);
			}}
		>
			{clubInfo.joinRequestStatus.status === "PENDING"
				? "Join Request Pending"
				: "Request to Join Club"}
		</Button>
	);

	const renderToggleButton = () => (
		<Button
			style={{
				position: "absolute",
				bottom: 10,
				right: 10,
				width: 50,
				height: 50,
				borderRadius: 25,
			}}
			onPress={() => setAddVisible(true)}
			accessoryLeft={(props: IconProps) => (
				<Icon name="plus-outline" {...props} />
			)}
		/>
	);
	const removeClubMember = (
		clubId: string,
		userId: string,
		reason: string
	) => {
		ClubService.removeMember(clubId, userId, reason)
			.then((response) => {
				console.log(response);
				refresh();
			})
			.catch((error) => {
				console.log(error);
				refresh();
			});
		//TODO: Add toasts
	};

	const addAnEvButton =
		clubInfo.role === "OWNER" || clubInfo.role === "OFFICER" ? (
			<Popover
				anchor={renderToggleButton}
				visible={addVisible}
				placement={"top end"}
				style={{ width: 150 }}
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
		<SafeAreaView
			style={[ContainerStyles.flexContainer, ContainerStyles.horizMargin]}
		>
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

			{isMember && (
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
					<Tab.Screen
						name="Members"
						component={MemberTab}
						initialParams={{
							members: clubInfo.members,
							role: clubInfo.role,
							clubId: clubInfo.id,
							update: removeClubMember,
						}}
						options={{ title: "Members" }}
					/>
				</Tab.Navigator>
			)}
			{addAnEvButton}
		</SafeAreaView>
	);
};

export default ClubScreen;
