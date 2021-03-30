import React, { ReactElement, useState } from "react";
import { StyleSheet } from "react-native";
import { ContainerStyles, TextStyle } from "../styles/CommonStyles";
import {
	Text,
	List,
	ListItem,
	Layout,
	Divider,
	Avatar,
	Card,
} from "@ui-kitten/components";
import { Club, Event } from "../types";
import { useNavigation } from "@react-navigation/native";
import ClubListItem from "./ClubListItem";
import { TouchableHighlight } from "react-native-gesture-handler";

type Props = {
	events: Event[];
	renderClubInfo?: boolean;
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

	const Footer = (item: Club) => {
		props.renderClubInfo ? (
			<ListItem
				style={{
					flexDirection: "row",
					alignContent: "center",
					margin: 5,
				}}
				onPress={() => {
					navigation.navigate("ClubNavigator", {
						title: item.name,
						screen: "Club",
						params: {
							id: item.id,
							title: item.name,
							role: item.role,
						},
					});
				}}
			>
				<Avatar
					source={{ uri: item.logo }}
					style={{
						marginRight: 5,
						height: 30,
						width: 30,
					}}
				/>
				<Text
					category="s1"
					style={{
						alignSelf: "center",
						marginHorizontal: 10,
					}}
				>
					{item.name}
				</Text>
			</ListItem>
		) : null;
	};

	return (
		<List
			data={props.events}
			renderItem={({ item }) => {
				var past;
				if (isCurrent(item.startTime, item.endTime)) past = 0;
				else isPast(item.endTime) ? (past = 2) : (past = 1);
				return (
					<Card
						style={[
							styles.default,
							past < 2 ? styles.upcoming : null,
							past === 0 ? styles.current : null,
						]}
						onPress={() =>
							navigation.navigate("Event", {
								id: item.id,
								title: item.name,
								role: item.role,
							})
						}
						footer={() =>
							props.renderClubInfo ? (
								<ListItem
									style={{
										flexDirection: "row",
										marginLeft: 16,
									}}
									onPress={() => {
										navigation.navigate("ClubNavigator", {
											title: item.club.name,
											screen: "Club",
											params: {
												id: item.club.id,
												title: item.club.name,
												role: item.club.role,
											},
										});
									}}
								>
									<Avatar
										source={{ uri: item.club.logo }}
										style={{
											marginRight: 5,
											height: 30,
											width: 30,
										}}
									/>
									<Text
										category="s1"
										style={{
											alignSelf: "center",
											marginHorizontal: 10,
										}}
									>
										{item.club.name}
									</Text>
								</ListItem>
							) : (
								((null as unknown) as ReactElement)
							)
						}
					>
						<Text category="h6">{item.name}</Text>
						<Text appearance="hint">
							{getReadableDate(item.startTime)} to{" "}
							{getReadableDate(item.endTime)}
						</Text>
						<Text appearance="hint">{item.shortLocation}</Text>
					</Card>
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
