import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Layout } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";

type ProfileParamList = {
	Profile: undefined;
	Settings: undefined;
	Club: { clubId: string; clubName: string };
};
type ProfileScreenRouteProp = RouteProp<ProfileParamList, "Club">;

type ProfileScreenNavigationProp = StackNavigationProp<
	ProfileParamList,
	"Club"
>;

type Props = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

const ClubScreen = (props: Props) => {
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
	if (loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}
	if (clubInfo === null) {
		return (
			<View>
				<Text>An error has occurred</Text>
			</View>
		);
	}
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

				<Card>
					<Text>{clubInfo?.description}</Text>
				</Card>
			</View>
		</SafeAreaView>
	);
};
export default ClubScreen;
