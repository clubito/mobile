import {
	Button,
	Calendar,
	Text,
	Layout,
	Popover,
	MenuGroup,
	DrawerGroup,
	DrawerItem,
	ButtonGroup,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import EventService from "../../services/EventService";
import { Event } from "../../types";
import EventList from "../../components/EventList";
import { ContainerStyles } from "../../styles/CommonStyles";

const EventListScreen = () => {
	const curDate = new Date();
	const [eventInfo, setEventInfo] = useState<Event[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [date, setDate] = React.useState(new Date());
	//viewAll = 0 to view all components, = 1 to view current, = 2 to view upcoming, = 3 for a specific day
	const [viewAll, setViewAll] = useState(1);

	useEffect(() => {
		if (eventInfo === null) {
			EventService.getAllEvents().then((data) => {
				setEventInfo(data);
				setLoading(false);
			});
		}
	}, []);

	const sameDay = (d1: Date, d2: Date) => {
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	};

	const isCurrent = (start: Date, end: Date) => {
		if (typeof start === "string") {
			start = new Date(start);
		}
		if (typeof end === "string") {
			end = new Date(end);
		}

		return curDate > start && curDate < end;
	};

	const isUpcoming = (d: Date) => {
		if (typeof d === "string") {
			d = new Date(d);
		}
		return d > curDate;
	};

	if (eventInfo === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	var filteredEvents: Event[];
	var listTitle: string;
	switch (viewAll) {
		case 0:
			filteredEvents = eventInfo;
			listTitle = "All Events";
			break;
		case 2:
			filteredEvents = eventInfo.filter((item) =>
				isUpcoming(item.startTime)
			);
			listTitle = "Upcoming Events";
			break;
		case 3:
			filteredEvents = eventInfo.filter((item) =>
				sameDay(item.startTime, date)
			);
			listTitle =
				"Events on " +
				date.toLocaleDateString([], {
					year: "2-digit",
					month: "2-digit",
					day: "2-digit",
				});
			break;
		default:
			filteredEvents = eventInfo.filter((item) =>
				isCurrent(item.startTime, item.endTime)
			);
			listTitle = "Ongoing Events";
			break;
	}

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<DrawerGroup title={() => <Text category="h3">Calendar</Text>}>
				<DrawerItem
					title={() => (
						<Calendar
							date={date}
							style={{ alignSelf: "center" }}
							onSelect={(nextDate) => {
								setDate(nextDate);
								setViewAll(3);
							}}
						/>
					)}
				/>
			</DrawerGroup>
			<ButtonGroup appearance="outline" style={{ borderRadius: 0 }}>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(0)}
					disabled={viewAll === 0}
				>
					View All
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(1)}
					disabled={viewAll === 1}
				>
					View Current
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(2)}
					disabled={viewAll === 2}
				>
					View Upcoming
				</Button>
			</ButtonGroup>

			<Text category="h2" style={{ alignSelf: "center" }}>
				{listTitle}
			</Text>
			<EventList events={filteredEvents} renderClubInfo={true} />
		</SafeAreaView>
	);
};

export default EventListScreen;
