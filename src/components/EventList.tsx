import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { ContainerStyles } from "../styles/CommonStyles";
import { Text, List, ListItem, Layout } from "@ui-kitten/components";
import { Event } from "../types";
import { useNavigation } from "@react-navigation/native";

type Props = {
	events: Event[];
};

const EventList = (props: Props) => {
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
	return (
		<List
			data={props.events}
			renderItem={({ item }) => (
				<ListItem
					style={{ margin: 10, flexDirection: "column" }}
					onPress={() =>
						navigation.navigate("Event", {
							title: item.name,
							screen: "Club",
							params: {
								id: item.id,
								title: item.name,
								role: item.role,
							},
						})
					}
				>
					<Text>{item.name}</Text>
					<Text appearance="hint">
						{getReadableDate(item.startTime)} to{" "}
						{getReadableDate(item.endTime)}
					</Text>
					<Text appearance="hint">{item.shortLocation}</Text>
				</ListItem>
			)}
		/>
	);
};
export default EventList;
