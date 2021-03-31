import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Text,
	List,
	Card,
	Button,
	Icon,
	ButtonGroup,
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
			renderItem={({ item }) => {
				return (
					<Card
						onPress={() =>
							navigation.push("Profile", {
								userId: item.id,
							})
						}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text category="h6" style={{ alignSelf: "center" }}>
								{item.name}
							</Text>
							<View style={{ flexDirection: "row" }}>
								<Button
									style={[styles.button,{marginRight: 5}]}
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
						</View>
					</Card>
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
});

export default ApplicationList;
