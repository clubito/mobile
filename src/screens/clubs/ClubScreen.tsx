import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import {
	Text,
	Card,
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
import { ClubParamList } from "./ClubNavigator";
import { getReadableDate } from "../../utils";
import LoadingScreen from "../../components/LoadingScreen";
import CoolCard from "../../components/CoolCard";
import EventList from "../../components/EventList";
import MemberList from "../../components/MemberList";

type ClubScreenRouteProp = RouteProp<ClubParamList, "Club">;
type ClubScreenNavigationProp = StackNavigationProp<ClubParamList, "Club">;

type Props = {
	route: ClubScreenRouteProp;
	navigation: ClubScreenNavigationProp;
};

export type ClubTabsParamList = {
	AnnouncementList: { announcementList: Announcement[] };
	EventList: { eventList: Event[]; clubName: string };
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
		return <LoadingScreen />;
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
				if (toast)
					toast.show(response.message, {
						type: "success",
					});
				refresh();
			})
			.catch((error) => {
				if (toast)
					toast.show(error.message, {
						type: "danger",
					});
				refresh();
			});
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
		<SafeAreaView style={ContainerStyles.flexContainer}>
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
			<CoolCard yip>
				<Text>{clubInfo?.description}</Text>
				{isMember ? (
					<Text
						appearance="hint"
						category="p2"
						style={ContainerStyles.upperMargin}
					>
						Member since{" "}
						{getReadableDate(
							clubInfo.joinRequestStatus.approvalDate,
							true
						)}
					</Text>
				) : null}
			</CoolCard>
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
				<Tab.Navigator tabBarOptions={{ scrollEnabled: true }}>
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
						component={() => (
							<EventList
								events={clubInfo.events!}
								clubName={clubInfo.name}
								refresh={false}
							/>
						)}
						options={{ title: "Events" }}
					/>
					<Tab.Screen
						name="Members"
						component={() => (
							<MemberList
								members={clubInfo.members!}
								role={clubInfo.role}
								clubId={clubInfo.id}
								update={removeClubMember}
							/>
						)}
						options={{ title: "Members" }}
					/>
				</Tab.Navigator>
			)}
			{addAnEvButton}
		</SafeAreaView>
	);
};

export default ClubScreen;
