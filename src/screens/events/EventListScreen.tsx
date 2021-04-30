import {
	Button,
	Calendar,
	Text,
	DrawerGroup,
	DrawerItem,
	ButtonGroup,
} from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventService from "../../services/EventService";
import { Event } from "../../types";
import EventList from "../../components/EventList";
import EmptyView from "../../components/EmptyView";
import { useNavigation } from "@react-navigation/core";
import { sameDay, isCurrent, isUpcoming } from "../../utils";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";
import { SearchIcon } from "../../components/Icons";
import CoolInput from "../../components/CoolInput";

const EventListScreen = () => {
	const [eventInfo, setEventInfo] = useState<Event[]>({} as Event[]);
	const [loading, setLoading] = useState(true);
	const [rsvps, setRsvps] = useState({} as Event[]);
	const [openEvents, setOpenEvents] = useState({} as Event[]);
	const [date, setDate] = React.useState(new Date());
	//viewAll = 0 to view all components, = 1 to view current, = 2 to view upcoming, = 3 for RSVPs, = 4 for open events, = 5 for a specific day
	const [viewAll, setViewAll] = useState(1);
	const navigation = useNavigation();
	const [refreshing, setRefreshing] = React.useState(false);
	const [query, setQuery] = useState("");
	const textInput = useRef("");

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		pullAllData();
	}, []);

	useEffect(() => {
		setLoading(true);
		pullAllData();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			pullAllData();
		});
		return unsubscribe;
	}, [navigation]);

	const pullAllData = () => {
		const fetch1 = EventService.getAllEvents();
		const fetch2 = EventService.getAllRSVPs();
		const fetch3 = EventService.getOpenEvents();
		Promise.all([fetch1, fetch2, fetch3])
			.then((responses) => {
				setEventInfo(responses[0]);
				setRsvps(responses[1]);
				setOpenEvents(responses[2]);
				setLoading(false);
				setRefreshing(false);
			})
			.catch((error) => {
				toast?.show(error.message, {
					type: "danger",
				});
			});
	};

	if (loading) {
		return <LoadingScreen />;
	}

	var filteredEvents: Event[];
	var listTitle = "";
	switch (viewAll) {
		case 0:
			filteredEvents = eventInfo.filter(
				(item) =>
					item.name.toLowerCase().includes(query.toLowerCase()) ||
					item.clubName.toLowerCase().includes(query.toLowerCase())
			);
			break;
		case 2:
			filteredEvents = eventInfo.filter(
				(item) =>
					isUpcoming(item.startTime) &&
					(item.name.toLowerCase().includes(query.toLowerCase()) ||
						item.clubName
							.toLowerCase()
							.includes(query.toLowerCase()))
			);
			break;
		case 3:
			filteredEvents = rsvps.filter(
				(item) =>
					item.name.toLowerCase().includes(query.toLowerCase()) ||
					item.clubName.toLowerCase().includes(query.toLowerCase())
			);
			break;
		case 4:
			filteredEvents = openEvents.filter(
				(item) =>
					item.isOpen &&
					(item.name.toLowerCase().includes(query.toLowerCase()) ||
						item.clubName
							.toLowerCase()
							.includes(query.toLowerCase()))
			);
			break;
		case 5:
			filteredEvents = eventInfo.filter(
				(item) =>
					sameDay(item.startTime, date) &&
					(item.name.toLowerCase().includes(query.toLowerCase()) ||
						item.clubName
							.toLowerCase()
							.includes(query.toLowerCase()))
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
			filteredEvents = eventInfo.filter(
				(item) =>
					isCurrent(item.startTime, item.endTime) &&
					(item.name.toLowerCase().includes(query.toLowerCase()) ||
						item.clubName
							.toLowerCase()
							.includes(query.toLowerCase()))
			);
			break;
	}

	return (
		<CoolView style={styles.container}>
			<SafeAreaView edges={["top"]} />

			<CoolInput
				placeholder="Search"
				returnKeyType="search"
				defaultValue={query}
				clearButtonMode="while-editing"
				accessoryRight={SearchIcon}
				onChangeText={(text) => (textInput.current = text)}
				onSubmitEditing={(event) => {
					setQuery(textInput.current);
				}}
			/>

			<DrawerGroup
				style={{ backgroundColor: "transparent" }}
				title={() => <Text category="s1">Calendar</Text>}
			>
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
								setViewAll(5);
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
				style={{ borderRadius: 0, width: "100%" }}
				size="small"
			>
				<Button
					style={{ flex: 1, paddingHorizontal: -15 }}
					onPress={() => setViewAll(0)}
					disabled={viewAll === 0}
				>
					All
				</Button>
				<Button
					style={{ flex: 1, paddingHorizontal: -15 }}
					onPress={() => setViewAll(1)}
					disabled={viewAll === 1}
				>
					Ongoing
				</Button>
				<Button
					style={{ flex: 1, paddingHorizontal: -15 }}
					onPress={() => setViewAll(2)}
					disabled={viewAll === 2}
				>
					Upcoming
				</Button>
				<Button
					style={{ flex: 1, paddingHorizontal: -15 }}
					onPress={() => setViewAll(3)}
					disabled={viewAll === 3}
				>
					RSVPs
				</Button>
				<Button
					style={{ flex: 1, paddingHorizontal: -15 }}
					onPress={() => setViewAll(4)}
					disabled={viewAll === 4}
				>
					Open
				</Button>
			</ButtonGroup>
			{listTitle ? (
				<Text category="h2" style={{ alignSelf: "center" }}>
					{listTitle}
				</Text>
			) : null}
			{filteredEvents.length > 0 ? (
				<EventList
					events={filteredEvents}
					refresh={refreshing}
					onRefresh={onRefresh}
				/>
			) : (
				<EmptyView message="Nothing's happening nearby :/" />
			)}
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		flexGrow: 1,
	},
});

export default EventListScreen;
