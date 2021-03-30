import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, Layout } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";

type ClubSettingsParamList = {
	ClubSettings: { clubId: string };
};
type ClubSettingsRouteProp = RouteProp<ClubSettingsParamList, "ClubSettings">;
type ClubSettingsNavigationProp = StackNavigationProp<
	ClubSettingsParamList,
	"ClubSettings"
>;

type Props = {
	route: ClubSettingsRouteProp;
	navigation: ClubSettingsNavigationProp;
};

const ClubSettings = (props: Props) => {
	const [clubInfo, setClubInfo] = useState({} as Club);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		ClubService.getClub(props.route.params.clubId).then((data) => {
			setClubInfo(data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
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
				></View>
				<Text>Club settings for {clubInfo.name}</Text>
			</View>
		</SafeAreaView>
	);
};

export default ClubSettings;
