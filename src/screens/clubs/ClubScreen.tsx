import React, { useEffect, useState } from "react";
import { Dimensions, Image, Platform, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import {
	Text,
	Card,
	Button,
	Popover,
	Menu,
	MenuItem,
} from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getReadableDate } from "../../utils";
import { Announcement, Club, Event, User } from "../../types";
import ClubService from "../../services/ClubService";
import AnnouncementList from "./AnnouncementList";
import EventTab from "./EventTab";
import { ClubParamList } from "./ClubNavigator";
import MemberTab from "./MemberTab";
import CoolCard from "../../components/CoolCard";
import FloatingButton from "../../components/FloatingButton";
import GeneralModal from "../../components/GeneralModal";
import LoadingScreen from "../../components/LoadingScreen";
import { PlusIcon } from "../../components/Icons";
import { hasPermission, RolePermissions } from "../../utils/permissions";
import EmptyView from "../../components/EmptyView";
import Carousel from "react-native-snap-carousel";

type ClubScreenRouteProp = RouteProp<ClubParamList, "Club">;
type ClubScreenNavigationProp = StackNavigationProp<ClubParamList, "Club">;

type Props = {
	route: ClubScreenRouteProp;
	navigation: ClubScreenNavigationProp;
};

export type ClubTabsParamList = {
	AnnouncementList: { announcementList: Announcement[] };
	EventList: { eventList: Event[] };
	Members: { members: User[] };
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
	const [viewPortWidth, setWidth] = useState();

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
		ClubService.getClub(props.route.params.id).then((club) => {
			setClubInfo(club);
			setIsMember(club.role.name !== "Non-Member");
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

	const addAnEvButton = () => {
		const canAnnouncement = hasPermission(
			clubInfo.role,
			RolePermissions.ADD_ANNOUNCEMENTS
		);
		const canEvent = hasPermission(
			clubInfo.role,
			RolePermissions.ADD_EDIT_EVENTS
		);

		return canAnnouncement || canEvent ? (
			<Popover
				anchor={() => (
					<FloatingButton
						icon={PlusIcon}
						onPress={() => {
							setAddVisible(true);
						}}
					/>
				)}
				visible={addVisible}
				placement={"top end"}
				style={{ width: 150 }}
				onBackdropPress={() => setAddVisible(false)}
			>
				<Menu>
					{canAnnouncement ? (
						<MenuItem
							title="Add Announcement"
							onPress={() => {
								setAddVisible(false);
								navigation.navigate("AddAnnouncement", {
									clubId: clubInfo.id,
								});
							}}
						/>
					) : (
						<></>
					)}
					{canAnnouncement ? (
						<MenuItem
							title="Add Event"
							onPress={() => {
								setAddVisible(false);
								navigation.navigate("AddEvent", {
									clubId: clubInfo.id,
								});
							}}
						/>
					) : (
						<></>
					)}
				</Menu>
			</Popover>
		) : (
			<></>
		);
	};

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
	const _renderItem = (item: { item: any; index: number }) => {
		return (
			<View
				style={{
					alignSelf: "center",
				}}
			>
				<Image
					source={{ uri: clubInfo.logo }}
					style={{
						width: 250,
						height: 250,
					}}
				/>
			</View>
		);
	};

	const { width: viewportWidth } = Dimensions.get("window");

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			{Platform.OS === "web" ? (
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
			) : (
				<Carousel
					data={[clubInfo.logo, clubInfo.logo, clubInfo.logo]}
					renderItem={_renderItem}
					sliderWidth={viewportWidth}
					sliderHeight={300}
					itemWidth={300}
					containerCustomStyle={{ flexGrow: 0, marginVertical: 10 }}
					style={{ alignSelf: "center" }}
				/>
			)}
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
				onDismiss={() => setModalVisible(false)}
				header={"Would you like to join " + clubInfo.name + "?"}
				onConfirm={sendRequest}
				content={
					"If you wish to join " +
					clubInfo.name +
					", confirm to send a request to the club owners and executives. They will confirm or deny your request."
				}
				status={"basic"}
			/>

			{isMember ? (
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
						component={EventTab}
						initialParams={{
							eventList: clubInfo.events,
						}}
						options={{ title: "Events" }}
					/>
					<Tab.Screen
						name="Members"
						component={MemberTab}
						initialParams={{
							members: clubInfo.members,
						}}
						options={{ title: "Members" }}
					/>
				</Tab.Navigator>
			) : clubInfo.events && clubInfo.events.length > 0 ? (
				<Tab.Navigator>
					<Tab.Screen
						name="EventList"
						component={EventTab}
						initialParams={{
							eventList: clubInfo.events,
						}}
						options={{ title: "Open Events" }}
					/>
				</Tab.Navigator>
			) : (
				<EmptyView
					message={
						"The club has no events. \nJoin the club to participate instead."
					}
				/>
			)}
			{addAnEvButton}
		</SafeAreaView>
	);
};

export default ClubScreen;
