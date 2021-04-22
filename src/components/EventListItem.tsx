import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, Avatar, Icon } from "@ui-kitten/components";
import { Event } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getReadableDate } from "../utils";
import CoolListItem from "./CoolListItem";

type Props = {
	event: Event;
	style?: StyleProp<ViewStyle>;
};

const EventListItem = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return (
		<CoolListItem
			style={[styles.container, props.style]}
			onPress={() => {
				navigation.push("Event", {
					id: props.event.id,
					title: props.event.name,
				});
			}}
			title={() => (
				<Text style={styles.title} category="s1">
					{props.event.name}
				</Text>
			)}
			accessoryLeft={() => (
				<Avatar
					source={{ uri: props.event.picture }}
					style={styles.avatar}
				/>
			)}
			description={() => (
				<View style={styles.infoContainer}>
					{props.event.clubName ? (
						<View style={styles.row}>
							<Icon
								name="people-outline"
								style={styles.icon}
								fill="grey"
							/>
							<Text appearance="hint" category="c1">
								{props.event.clubName}
							</Text>
						</View>
					) : null}

					<View style={styles.row}>
						<Icon
							name="clock-outline"
							style={styles.icon}
							fill="grey"
						/>
						<Text category="c1" appearance="hint">
							{getReadableDate(props.event.startTime)} to{" "}
							{getReadableDate(props.event.endTime)}
						</Text>
					</View>

					<View style={styles.row}>
						<Icon
							name="pin-outline"
							style={styles.icon}
							fill="grey"
						/>
						<Text category="c1" appearance="hint">
							{props.event.shortLocation}
						</Text>
					</View>
				</View>
			)}
		/>
	);
};

/*	For lack of a better option, add styling based on event timing
	If an event has passed, do not add border
	If an event has not ended, add black border
	If an event is currently ongoing, change border to red
 */
const styles = StyleSheet.create({
	container: {
		margin: 5,
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

export default EventListItem;
