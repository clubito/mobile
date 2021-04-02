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
import { Event } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getReadableDate } from "../utils";
import EmptyView from "./EmptyView";

type Props = {
	events: Event[];
	clubName: string;
	renderClubInfo?: boolean;
	refresh: boolean;
	onRefresh?: () => void;
};

const EventList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return props.events.length > 0 ? (
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
						title={() => (
							<Text style={styles.title} category="s1">
								{item.name}
							</Text>
						)}
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
										{item.clubName ? item.clubName : props.clubName}
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
	) : (
		<EmptyView message="Boooooooooring :|" />
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
	icon: {
		flex: 1,
		marginRight: 5,
		height: 12,
		width: 12,
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
	title: {
		marginLeft: 8,
		fontSize: 16,
	},
});

export default EventList;
