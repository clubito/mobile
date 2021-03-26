import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ContainerStyles } from "../styles/CommonStyles";
import { Text, List, ListItem, Layout } from "@ui-kitten/components";
import { Event } from "../types";
import { useNavigation } from "@react-navigation/native";

type Props = {
	events: Event[];
};

const EventList = (props: Props) => {
	const curDate = new Date();
	const navigation = useNavigation();

	const getReadableDate = (d: Date) => {
		if (typeof d === "string") {
			d = new Date(d);
		}
		return (
			String(
				d.toLocaleDateString([], {
					year: "2-digit",
					month: "2-digit",
					day: "2-digit",
				})
			) +
			" " +
			String(
				d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
			)
		);
	};
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
			data={props.events}
			renderItem={({ item }) => {
				var past;
				if (isCurrent(item.startTime, item.endTime)) past = 0;
				else isPast(item.endTime) ? (past = 2) : (past = 1);
				return (
					<ListItem
						style={[
							styles.default,
							past < 2 ? styles.upcoming : null,
							past === 0 ? styles.current : null,
						]}
						onPress={() =>
							navigation.navigate("Event", {
								title: item.name,
								params: {
									id: item.id,
									title: item.name,
									role: item.role,
								},
							})
						}
					>
						<Text category="h6">{item.name}</Text>
						<Text appearance="hint">
							{getReadableDate(item.startTime)} to{" "}
							{getReadableDate(item.endTime)}
						</Text>
						<Text appearance="hint">{item.shortLocation}</Text>
					</ListItem>
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
	default: {
		margin: 10,
		flexDirection: "column",
		alignItems: "flex-start",
	},
	upcoming: { borderWidth: 1, borderRadius: 5 },
	current: { borderColor: "red" },
});

export default EventList;
