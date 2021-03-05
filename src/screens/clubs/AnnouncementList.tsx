import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import {
	Text,
	Card,
	Layout,
	Button,
	Icon,
	List,
	ListItem,
} from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Announcement, Club } from "../../types";
import ClubService from "../../services/ClubService";
import { ClubTabsParamList } from "./ClubScreen";

type ProfileScreenRouteProp = RouteProp<ClubTabsParamList, "AnnouncementList">;

type ProfileScreenNavigationProp = StackNavigationProp<
	ClubTabsParamList,
	"AnnouncementList"
>;

type Props = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

const AnnouncementList = (props: Props) => {
	const [announcements, setAnnouncements] = useState<Announcement[]>(
		props.route.params.announcementList
	);

	return (
		<View style={ContainerStyles.horizMargin}>
			<List
				data={announcements}
				renderItem={({ item }) => (
					<View style={ContainerStyles.extraMargin}>
						<Text>{item.message}</Text>
						<Text appearance="hint">{item.timestamp}</Text>
					</View>
				)}
			></List>
		</View>
	);
};

export default AnnouncementList;
