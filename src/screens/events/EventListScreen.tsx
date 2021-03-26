import { Button, Calendar, Text, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import EventService from "../../services/EventService";
import { Event } from "../../types";
import EventList from "../../components/EventList";
import { ContainerStyles } from "../../styles/CommonStyles";
import { useNavigation } from "@react-navigation/native";

const EventListScreen = () => {
	const [eventInfo, setEventInfo] = useState<Event[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [date, setDate] = React.useState(new Date());
	const [viewAll, setViewAll] = useState(true);

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

	if (eventInfo === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	var filteredEvents: Event[];

	if (viewAll) filteredEvents = eventInfo;
	else
		filteredEvents = eventInfo.filter((item) =>
			sameDay(item.startTime, date)
		);

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<Calendar
				date={date}
				style={{ alignSelf: "center" }}
				onSelect={(nextDate) => {
					setDate(nextDate);
					setViewAll(false);
				}}
				renderFooter={() => (
					<Button onPress={() => setViewAll(true)} disabled={viewAll}>
						View All Events
					</Button>
				)}
			/>
			<Text category="h2" style={{ alignSelf: "center" }}>
				{viewAll
					? "All Events"
					: "Events on " +
					  date.toLocaleDateString([], {
							year: "2-digit",
							month: "2-digit",
							day: "2-digit",
					  })}
			</Text>
			<EventList events={filteredEvents} />
		</SafeAreaView>
	);
};

export default EventListScreen;
