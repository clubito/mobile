import React from "react";
import { View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, List } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Announcement } from "../../types";
import { ClubTabsParamList } from "./ClubScreen";

type AnnouncementListRouteProp = RouteProp<ClubTabsParamList, "AnnouncementList">;

type AnnouncementListNavigationProp = StackNavigationProp<
	ClubTabsParamList,
	"AnnouncementList"
>;

type Props = {
	route: AnnouncementListRouteProp;
	navigation: AnnouncementListNavigationProp;
};

const AnnouncementList = (props: Props) => {
	const announcements: Announcement[] = props.route.params.announcementList;

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
