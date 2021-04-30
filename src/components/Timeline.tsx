import React, { useEffect, useState } from "react";
import { TimelineItem, TimelineListType } from "../types";
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
import { Icon } from "@ui-kitten/components";

const TimelineList = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isLoading, setIsLoading] = useState(true);
	const [timeline, setTimeline] = useState({} as TimelineItem[]);
	const [refreshing, setRefreshing] = React.useState(false);

	useEffect(() => {
		setIsLoading(true);
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
				toast?.show(error.message, {
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
				<CoolText appearance="hint">
					{"Event occurred on " + getReadableDate(event.startTime)}
				</CoolText>,
				<EventListItem event={event} />,
				calendarIcon,
			];
		} else if (item.type === "ANNOUNCEMENT") {
			const announcement = item.item as Announcement;
			return [
				<CoolText appearance="hint">
					{"Announcement on " +
						getReadableDate(announcement.timestamp)}
				</CoolText>,
				<AnnouncementListItem announcement={announcement} />,
				announcementIcon,
			];
		} else {
			const club = item.item as Club;
			return [
				<CoolText appearance="hint">
					{"Joined club on " +
						getReadableDate(club.joinRequestStatus.approvalDate)}
				</CoolText>,
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
				clubIcon,
			];
		}
	};

	const calendarIcon = (
		<Icon name="calendar-outline" style={{ height: 30, width: 30 }} />
	);
	const announcementIcon = (
		<Icon name="alert-circle-outline" style={{ height: 30, width: 30 }} />
	);
	const clubIcon = (
		<Icon name="people-outline" style={{ height: 30, width: 30 }} />
	);

	return timeline.length > 0 ? (
		<Timeline
			data={timeline.map((item) => {
				const component = getComponents(item);
				return {
					title: component[0],
					description: component[1],
					icon: component[2],
				};
			})}
			// options={{
			// 	refreshControl: (
			// 		<CoolRefreshControl
			// 			refreshing={refreshing}
			// 			onRefresh={pullAllData}
			// 		/>
			// 	),
			// }}
			showTime={false}
			separator={true}
			innerCircle={"icon"}
			circleSize={40}
			detailContainerStyle={{ marginLeft: 10 }}
		/>
	) : (
		<EmptyView message="No activities" />
	);
};

export default TimelineList;
