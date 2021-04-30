import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { Announcement } from "../types";
import { getReadableDate } from "../utils";
import CoolListItem from "./CoolListItem";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
	announcement: Announcement;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

const EventListItem = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return (
		<CoolListItem
			style={[styles.announcementContainer, props.style]}
			description={() => (
				<View>
					<Text style={styles.row}>{props.announcement.message}</Text>
					<Text
						style={styles.row}
						appearance="hint"
						numberOfLines={1}
					>
						{getReadableDate(props.announcement.timestamp)}
					</Text>
				</View>
			)}
			onPress={props?.onPress}
		/>
	);
};

const styles = StyleSheet.create({
	announcementContainer: {
		paddingHorizontal: 16,
	},
	row: {
		flexDirection: "row",
	},
});

export default EventListItem;
