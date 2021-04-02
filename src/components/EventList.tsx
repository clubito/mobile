import React, { ReactElement, useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ContainerStyles, TextStyle } from "../styles/CommonStyles";
import {
	Text,
	List,
	Avatar,
	Divider,
	Icon,
	ListItem,
} from "@ui-kitten/components";
import { Club, Event } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getReadableDate } from "../utils";

type Props = {
	events: Event[];
	renderClubInfo?: boolean;
	refresh: boolean;
	onRefresh?: () => void;
};

const EventList = (props: Props) => {
	const curDate = new Date();
	const navigation = useNavigation<StackNavigationProp<any>>();

	const isPast = (d: Date) => {
		if (typeof d === "string") {
			d = new Date(d);
		}
		return d < curDate;
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

	return (
		<List
			style={styles.list}
			data={props.events}
			ItemSeparatorComponent={Divider}
			refreshControl={
				<RefreshControl
					refreshing={props.refresh}
					onRefresh={props.onRefresh}
				/>
			}
			renderItem={({ item }) => {
				var past;
				if (isCurrent(item.startTime, item.endTime)) past = 0;
				else isPast(item.endTime) ? (past = 2) : (past = 1);
				return (
					<ListItem
						style={styles.container}
						onPress={() => {
							navigation.push("Event", {
								id: item.id,
								title: item.name,
								role: item.role,
							});
						}}
						title={item.name}
						accessoryLeft={() => (
							<Avatar
								source={{ uri: item.picture }}
								style={styles.avatar}
							/>
						)}
						description={() => (
							<View style={styles.infoContainer}>
								<View style={styles.row}>
									<Icon
										name="people-outline"
										style={styles.icon}
										fill="grey"
									/>
									<Text appearance="hint" category="c1">
										{item.clubName}
									</Text>
								</View>

								<View style={styles.row}>
									<Icon
										name="clock-outline"
										style={styles.icon}
										fill="grey"
									/>
									<Text category="c1" appearance="hint">
										{getReadableDate(item.startTime)} to{" "}
										{getReadableDate(item.endTime)}
									</Text>
								</View>

								<View style={styles.row}>
									<Icon
										name="pin-outline"
										style={styles.icon}
										fill="grey"
									/>
									<Text category="c1" appearance="hint">
										{item.shortLocation}
									</Text>
								</View>
							</View>
						)}
					/>
				);
			}}
		/>
	);
};

/*	For lack of a better option, add styling based on event timing
	If an event has passed, do not add border
	If an event has not ended, add black border
	If an event is currently ongoing, change border to red
 */
const styles = StyleSheet.create({
	container: { margin: 5 },
	list: {
		backgroundColor: "white",
	},
	upcoming: { borderWidth: 1, borderRadius: 5 },
	current: { borderColor: "red" },
	icon: {
		flex: 1,
		marginRight: 5,
		height: 12,
		width: 12,
	},
	avatarBox: {
		flex: 1,
		alignSelf: "center",
		marginLeft: -20,
		marginRight: 20,
	},
	avatar: {
		height: 50,
		width: 50,
	},
	row: {
		flexDirection: "row",
	},
	infoContainer: {
		marginLeft: 8,
	},
});

export default EventList;
