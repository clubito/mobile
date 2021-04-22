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
import { JoinRequest, TimelineItem } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import UserService from "../services/UserService";
import EventListItem from "./EventListItem";
import ClubListItem from "./ClubListItem";
import LoadingScreen from "./LoadingScreen";
import TimelineListItem from "./TimelineListItem";
import CoolDivider from "./CoolDivider";
import { RefreshControl } from "react-native";

const Timeline = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isLoading, setIsLoading] = useState(true);
	const [timeline, setTimeline] = useState({} as TimelineItem[]);
	const [refreshing, setRefreshing] = React.useState(false);

	useEffect(() => {
		pullAllData();
	}, []);

	const pullAllData = () => {
		setRefreshing(true);
		UserService.getTimeline()
			.then((data) => {
				setTimeline(data);
				setIsLoading(false);
				setRefreshing(false);
			})
			.catch((error) => {
				if (toast)
					toast.show(error.message, {
						type: "danger",
					});
			});
	};

	if (isLoading) {
		return <LoadingScreen />;
	}
	console.log(timeline);

	return (
		<List
			data={timeline}
			renderItem={({ item }) => <TimelineListItem item={item} />}
			ItemSeparatorComponent={CoolDivider}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={pullAllData}
				/>
			}
		/>
	);
};

export default Timeline;
