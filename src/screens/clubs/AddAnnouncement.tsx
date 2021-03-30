import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, Layout, Button } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";
import { ClubParamList } from "./ClubNavigator";

type AddAnnouncementRouteProp = RouteProp<ClubParamList, "AddAnnouncement">;
type AddAnnouncementNavigationProp = StackNavigationProp<
	ClubParamList,
	"AddAnnouncement"
>;

type Props = {
	route: AddAnnouncementRouteProp;
	navigation: AddAnnouncementNavigationProp;
};

const AddAnnouncementScreen = (props: Props) => {
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	const [loading, setLoading] = useState(true);

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

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<View style={ContainerStyles.horizMargin}>
				<Text>Add Announcement for {clubInfo.name}</Text>
			</View>
		</SafeAreaView>
	);
};
export default AddAnnouncementScreen;
