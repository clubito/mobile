import { Avatar, Button, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { Club } from "../types";

interface Props {
	club: Club;
	onPress: () => void;
}

const ClubListItem = (props: Props) => {
	const membership =
		props.club.role !== "NONMEMBER" ? props.club.role.substring(0, 1) : "";
	const membershipTextColor = membership === "O" ? "danger" : "info";

	return (
		<ListItem
			onPress={props.onPress}
			title={() => (
				<Text style={styles.title} category="s1">
					{props.club.name}
				</Text>
			)}
			description={() => (
				<Text appearance="hint" style={styles.desc} numberOfLines={1}>
					{props.club.description}
				</Text>
			)}
			accessoryLeft={() => (
				<Avatar
					source={{ uri: props.club.logo }}
					style={{ marginRight: 5, height: 45, width: 45 }}
				/>
			)}
			accessoryRight={() => (
				<Button
					size="small"
					appearance="ghost"
					status={membershipTextColor}
				>
					{membership}
				</Button>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	title: {
		marginLeft: 8,
		fontSize: 16,
	},
	desc: {
		marginLeft: 8,
		fontSize: 14,
	},
});

export default ClubListItem;
