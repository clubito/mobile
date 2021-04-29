import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import CoolView from "./CoolView";
import { getReadableDate } from "../utils";
import CoolDivider from "./CoolDivider";

interface ClubDetailsProps {
	name: string;
	description: string;
	picture: string;
	tags: string[];
	theme: string;
}

const ClubDetails = (props: ClubDetailsProps) => {
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

			{props.picture ? (
				<>
					<View style={styles.itemContainer}>
						<Text category="s2" appearance="hint">
							Picture
						</Text>
						<Image
							source={{ uri: props.picture }}
							style={styles.imageStyle}
						/>
					</View>
					<CoolDivider />
				</>
			) : null}

			{props.tags ? (
				<View style={styles.itemContainer}>
					<Text category="s2" appearance="hint">
						Tags
					</Text>
					<Text>{props.tags.join(", ")}</Text>
				</View>
			) : null}
			{props.theme ? (
				<View style={styles.itemContainer}>
					<Text category="s2" appearance="hint">
						Theme
					</Text>
					<Text>{props.theme}</Text>
				</View>
			) : null}
		</CoolView>
	);
};

const styles = StyleSheet.create({
	cardBorder: {
		borderRadius: 5,
	},
	itemContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	imageStyle: {
		width: 300,
		height: 100,
		resizeMode: "center",
		alignSelf: "center",
	},
});

export default ClubDetails;
