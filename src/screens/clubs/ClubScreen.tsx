import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TouchableHighlight,
} from "react-native";
import { TextStyle, ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Divider, List } from "@ui-kitten/components";
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
	console.log(props.route.params);
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	useEffect(() => {
		if (clubInfo === null) {
			ClubService.getClub(props.route.params.clubId).then((data) => {
				setClubInfo(data);
			});
		}
	}, []);
	return (
		<View style={ContainerStyles.horizMargin}>
			<Text>{props.route.params.clubName}</Text>
		</View>
	);
};
export default ClubScreen;
