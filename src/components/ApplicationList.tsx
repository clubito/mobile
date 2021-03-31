import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Text,
	List,
	Button,
	Icon,
	ListItem,
	Avatar,
} from "@ui-kitten/components";
import { JoinRequest } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
	applicants: JoinRequest[];
	role: string;
};

const ApplicationList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	console.log(props.applicants);

	const getReadableDate = (d: Date) => {
		if (typeof d === "string") {
			d = new Date(d);
		}
		return (
			String(
				d.toLocaleDateString([], {
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
			data={props.applicants}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				return (
					<ListItem
						onPress={() =>
							navigation.push("Profile", {
								userId: item.user.id,
							})
						}
						title={() => (
							<Text style={styles.title} category="s1">
								{item.user.name}
							</Text>
						)}
						description={() => (
							<Text
								appearance="hint"
								style={styles.desc}
								numberOfLines={1}
							>
								{getReadableDate(item.requestedAt)}
							</Text>
						)}
						accessoryLeft={() => (
							<Avatar
								source={{ uri: item.user.profilePicture }}
								style={{
									marginRight: 5,
									height: 45,
									width: 45,
								}}
							/>
						)}
						accessoryRight={() => (
							<View style={{ flexDirection: "row" }}>
								<Button
									style={[styles.button, { marginRight: 5 }]}
									status="success"
									accessoryLeft={() => (
										<Icon
											name="checkmark-outline"
											style={styles.icon}
											fill="white"
										/>
									)}
								/>
								<Button
									style={styles.button}
									status="danger"
									accessoryLeft={() => (
										<Icon
											name="close-outline"
											style={styles.icon}
											fill="white"
										/>
									)}
								/>
							</View>
						)}
					/>
				);
			}}
		/>
	);
};
const styles = StyleSheet.create({
	button: {
		width: 35,
		height: 35,
	},
	icon: {
		width: 30,
		height: 30,
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
export default ApplicationList;
