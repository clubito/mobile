import { Avatar, Button, Text } from "@ui-kitten/components";
import React from "react";
import { StyleProp, StyleSheet } from "react-native";
import { Club } from "../types";
import CoolListItem from "./CoolListItem";

interface Props {
	club: Club;
	onPress: () => void;
	style?: StyleProp<any>;
}

const ClubListItem = (props: Props) => {
	const membership =
		props.club.role.name !== "Non-Member"
			? props.club.role.name === "Member"
				? "M"
				: "O"
			: "";
	const membershipTextColor = membership === "O" ? "danger" : "info";

	return (
		<CoolListItem
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
			style={[styles.container, props.style]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
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
