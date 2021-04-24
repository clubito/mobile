import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Text,
	List,
	Button,
	Icon,
	ListItem,
	Avatar,
} from "@ui-kitten/components";
import {
	Announcement,
	Club,
	Event,
	TimelineItem,
	TimelineListType,
} from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import UserService from "../services/UserService";
import EventListItem from "./EventListItem";
import ClubListItem from "./ClubListItem";
import LoadingScreen from "./LoadingScreen";
import CoolView from "./CoolView";
import AnnouncementListItem from "./AnnouncementListItem";
import { getReadableDate } from "../utils";

interface TimelineItemProps {
	item: TimelineItem;
}

const TimelineListItem = (props: TimelineItemProps) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	const getComponents = (item: TimelineItem) => {
		if (item.type === "EVENT") {
			const event = item.item as Event;
			return [
				"Event occurred on " + getReadableDate(event.startTime),
				"calendar-outline",
				<EventListItem event={event} />,
			];
		} else if (item.type === "ANNOUNCEMENT") {
			const announcement = item.item as Announcement;
			return [
				"Announcement on " + getReadableDate(announcement.timestamp),
				"alert-circle-outline",
				<AnnouncementListItem
					announcement={props.item.item as Announcement}
					pressable={true}
				/>,
			];
		} else {
			const club = item.item as Club;
			return [
				"Joined club on " +
					getReadableDate(club.joinRequestStatus.approvalDate),
				"people-outline",
				<ClubListItem
					club={club}
					onPress={() => {
						navigation.push("ClubNavigator", {
							title: club.name,
							screen: "Club",
							params: {
								id: club.id,
								title: club.name,
								role: club.role,
							},
						});
					}}
				/>,
			];
		}
	};

	const components = getComponents(props.item);

	return (
		<CoolView>
			<CoolView
				style={{
					flexDirection: "row",
					flex: 1,
					marginTop: 10,
				}}
			>
				<Icon
					name={components[1] as string}
					fill="grey"
					style={styles.icon}
				/>
				<Text style={{ alignSelf: "center" }} appearance="hint">
					{components[0]}
				</Text>
			</CoolView>
			{components[2]}
		</CoolView>
	);
};

const styles = StyleSheet.create({
	icon: {
		borderRightWidth: 1,
		width: 25,
		height: 25,
		marginRight: 8,
		flex: 1,
		alignSelf: "center",
	},
	container: {
		flexDirection: "row",
		flex: 1,
	},
});

export default TimelineListItem;
