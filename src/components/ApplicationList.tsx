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
import { User } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
	applicants: User[];
	role: string;
};

const ApplicationList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return (
		<List
			data={props.applicants}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				return (
					<ListItem
						onPress={() =>
							navigation.push("Profile", {
								userId: item.id,
							})
						}
						title={() => (
							<Text style={styles.title} category="s1">
								{item.name}
							</Text>
						)}
						accessoryLeft={() => (
							<Avatar
								source={{ uri: item.profilePicture }}
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
});

export default ApplicationList;
