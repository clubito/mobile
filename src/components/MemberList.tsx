import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, List, Card, Button, Icon } from "@ui-kitten/components";
import { User } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
	members: User[];
	role: string;
};

const MemberList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const isAdmin = true; //= props.role === "OWNER" || props.role === "OFFICER";

	return (
		<List
			data={props.members}
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
							{isAdmin ? (
								<Button
									style={styles.deleteButton}
									appearance="ghost"
									accessoryLeft={() => (
										<Icon
											name="close-outline"
											style={styles.icon}
											fill="red"
										/>
									)}
								/>
							) : null}
						</View>
					</Card>
				);
			}}
		/>
	);
};
const styles = StyleSheet.create({
	deleteButton: {
		width: 35,
		height: 35,
	},
	icon: {
		width: 30,
		height: 30,
	},
});

export default MemberList;
