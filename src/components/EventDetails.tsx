import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import CoolView from "./CoolView";
import { getReadableDate } from "../utils";
import CoolDivider from "./CoolDivider";

interface EventDetailsProps {
	name?: string;
	startTime: string | Date;
	endTime: string | Date;
	description?: string;
	shortLocation?: string;
	footer?: string | React.ReactNode;
}

const EventDetails = (props: EventDetailsProps) => {
	return (
		<CoolView style={styles.cardBorder} yip>
			{props.name ? (
				<>
					<View style={styles.itemContainer}>
						<Text category="s2" appearance="hint">
							Name
						</Text>
						<Text>{props.name}</Text>
					</View>
					<CoolDivider />
				</>
			) : null}

			<View style={styles.timeContainer}>
				<View style={styles.timeItem}>
					<Text category="s2" appearance="hint">
						Start
					</Text>
					<Text>{getReadableDate(props.startTime)}</Text>
				</View>

				<View style={styles.timeItem}>
					<Text category="s2" appearance="hint">
						End
					</Text>
					<Text>{getReadableDate(props.endTime)}</Text>
				</View>
			</View>

			<CoolDivider />

			{props.description ? (
				<>
					<View style={styles.itemContainer}>
						<Text category="s2" appearance="hint">
							Description
						</Text>
						<Text>{props.description}</Text>
					</View>
					<CoolDivider />
				</>
			) : null}

			{props.shortLocation ? (
				<>
					<View style={styles.itemContainer}>
						<Text category="s2" appearance="hint">
							Location
						</Text>
						<Text>{props.shortLocation}</Text>
					</View>
					<CoolDivider />
				</>
			) : null}

			{props.footer ? (
				typeof props.footer === "string" ? (
					<View style={styles.itemContainer}>
						<Text>{props.footer}</Text>
					</View>
				) : (
					props.footer
				)
			) : null}
		</CoolView>
	);
};

const styles = StyleSheet.create({
	cardBorder: {
		borderRadius: 5,
	},
	timeContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		flexDirection: "row",
	},
	timeItem: {
		flex: 1,
	},
	itemContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
});

export default EventDetails;
