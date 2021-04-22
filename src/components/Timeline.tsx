import React, { useEffect, useState } from "react";
import { TimelineItem } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import UserService from "../services/UserService";
import EventListItem from "./EventListItem";
import ClubListItem from "./ClubListItem";
import LoadingScreen from "./LoadingScreen";
import Timeline from "react-native-timeline-flatlist";
import { Event, Announcement, Club } from "../types";
import { getReadableDate } from "../utils";
import AnnouncementListItem from "./AnnouncementListItem";
import CoolText from "./CoolText";
import EmptyView from "./EmptyView";
import CoolRefreshControl from "./CoolRefreshControl";

const TimelineList = () => {
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

	const getComponents = (item: TimelineItem) => {
		if (item.type === "EVENT") {
			const event = item.item as Event;
			return [
				"Event occurred on " + getReadableDate(event.startTime),
				getReadableDate(event.startTime),
				<EventListItem event={event} />,
			];
		} else if (item.type === "ANNOUNCEMENT") {
			const announcement = item.item as Announcement;
			return [
				"Announcement on " + getReadableDate(announcement.timestamp),
				getReadableDate(announcement.timestamp),
				<AnnouncementListItem
					announcement={announcement}
					pressable={true}
				/>,
			];
		} else {
			const club = item.item as Club;
			return [
				"Joined club on " +
					getReadableDate(club.joinRequestStatus.approvalDate),
				getReadableDate(club.joinRequestStatus.approvalDate),
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

	const title = (message: string) => (
		<CoolText appearance="hint">{message}</CoolText>
	);

	return timeline.length > 0 ? (
		<Timeline
			data={timeline.map((item) => {
				const component = getComponents(item);
				return {
					time: component[1],
					title: title(component[0] as string),
					description: component[2],
				};
			})}
			options={{
				refreshControl: (
					<CoolRefreshControl
						refreshing={refreshing}
						onRefresh={pullAllData}
					/>
				),
			}}
			showTime={false}
			separator={true}
			titleStyle={{ marginTop: -8 }}
		/>
	) : (
		<EmptyView message="No activities" />
	);
};

export default TimelineList;
