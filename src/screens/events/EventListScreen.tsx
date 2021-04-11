import {
	Button,
	Calendar,
	Text,
	DrawerGroup,
	DrawerItem,
	ButtonGroup,
	Input,
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

const EventListScreen = () => {
	const [eventInfo, setEventInfo] = useState<Event[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [loading1, setLoading1] = useState(true);
	const [rsvps, setRsvps] = useState({} as Event[]);
	const [date, setDate] = React.useState(new Date());
	//viewAll = 0 to view all components, = 1 to view current, = 2 to view upcoming, = 3 for RSVPs, = 4 for a specific day
	const [viewAll, setViewAll] = useState(1);
	const navigation = useNavigation();
	const [refreshing, setRefreshing] = React.useState(false);
	const [query, setQuery] = useState("");
	const textInput = useRef("");

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
		EventService.getAllEvents()
			.then((data) => {
				setEventInfo(data);
				setLoading(false);
			})
			.catch((error) => {
				if (toast)
					toast.show(error.message, {
						type: "danger",
					});
			});
		EventService.getAllRSVPs()
			.then((data) => {
				setRsvps(data);
				setLoading1(false);
			})
			.catch((error) => {
				if (toast)
					toast.show(error.message, {
						type: "danger",
					});
			});
	};

	if (eventInfo === null || loading || loading1) {
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

			<Input
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
			{filteredEvents.length > 0 ? (
				<EventList
					events={filteredEvents}
					renderClubInfo={true}
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
		paddingHorizontal: 16,
		flexGrow: 1,
	},
});

export default EventListScreen;
