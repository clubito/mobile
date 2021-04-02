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
import { useNavigation } from "@react-navigation/core";

const EventListScreen = () => {
	const curDate = new Date();
	const [eventInfo, setEventInfo] = useState<Event[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [loading1, setLoading1] = useState(true);
	const [rsvps, setRsvps] = useState({} as Event[]);
	const [date, setDate] = React.useState(new Date());
	//viewAll = 0 to view all components, = 1 to view current, = 2 to view upcoming, = 3 for RSVPs, = 4 for a specific day
	const [viewAll, setViewAll] = useState(1);
	const navigation = useNavigation();
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		pullAllData();
	}, []);

	useEffect(() => {
		if (eventInfo === null) {
			pullAllData();
		}
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			pullAllData();
		});
		return unsubscribe;
	}, [navigation]);

	const pullAllData = () => {
		EventService.getAllEvents().then((data) => {
			setEventInfo(data);
			setLoading(false);
		});
		EventService.getAllRSVPs().then((data) => {
			setRsvps(data);
			setLoading1(false);
		});
	};

	type datestring = Date | string;

	const sameDay = (d1: datestring, d2: datestring) => {
		const date1 = new Date(d1);
		const date2 = new Date(d2);
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	};

	const isCurrent = (start: datestring, end: datestring) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		return curDate > startDate && curDate < endDate;
	};

	const isUpcoming = (d: datestring) => {
		const d1 = new Date(d);
		return d1 > curDate;
	};

	if (eventInfo === null || loading || loading1) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	var filteredEvents: Event[];
	var listTitle = "";
	switch (viewAll) {
		case 0:
			filteredEvents = eventInfo;
			break;
		case 2:
			filteredEvents = eventInfo.filter((item) =>
				isUpcoming(item.startTime)
			);
			break;
		case 3:
			filteredEvents = rsvps;
			break;
		case 4:
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
			break;
	}

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<DrawerGroup title={() => <Text category="h3">Calendar</Text>}>
				<DrawerItem
					style={{
						alignSelf: "center",
						backgroundColor: "transparent",
					}}
					title={() => (
						<Calendar
							date={date}
							style={{ alignSelf: "center", height: 370 }}
							onSelect={(nextDate) => {
								setDate(nextDate);
								setViewAll(4);
							}}
							filter={(d: Date) => {
								return eventInfo.some((ev) => {
									return sameDay(d, ev.startTime);
								});
							}}
						/>
					)}
				/>
			</DrawerGroup>
			<ButtonGroup
				appearance="outline"
				style={{ borderRadius: 0 }}
				size="small"
			>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(0)}
					disabled={viewAll === 0}
				>
					All
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(1)}
					disabled={viewAll === 1}
				>
					Ongoing
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(2)}
					disabled={viewAll === 2}
				>
					Upcoming
				</Button>
				<Button
					style={{ flex: 1 }}
					onPress={() => setViewAll(3)}
					disabled={viewAll === 3}
				>
					RSVPs
				</Button>
			</ButtonGroup>
			{listTitle ? (
				<Text category="h2" style={{ alignSelf: "center" }}>
					{listTitle}
				</Text>
			) : null}
			<EventList
				events={filteredEvents}
				renderClubInfo={true}
				refresh={refreshing}
				onRefresh={onRefresh}
			/>
		</SafeAreaView>
	);
};

export default EventListScreen;
