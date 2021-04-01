import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, List, Card, Button, Icon, Layout } from "@ui-kitten/components";
import { User } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import GeneralModal from "./GeneralModal";
import { SafeAreaView } from "react-native-safe-area-context";
import ClubService from "../services/ClubService";

type Props = {
	members: User[];
	role: string;
	clubId: string;
};

const MemberList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const isAdmin = true; //= props.role === "OWNER" || props.role === "OFFICER";
	const [visible, setVisible] = React.useState(false);
	const [user, setUser] = React.useState({} as User);

	const removeClubMember = (userId: string) => {
		setVisible(false);
		console.log(props.clubId);
		ClubService.removeMember(props.clubId, userId, "yajha")
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const triggerModal = (user: User) => {
		setVisible(true);
		setUser(user);
	};

	return (
		<>
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
								<Text
									category="h6"
									style={{ alignSelf: "center" }}
								>
									{item.name}
								</Text>
								{isAdmin ? (
									<Button
										style={styles.deleteButton}
										appearance="ghost"
										onPress={() => triggerModal(item)}
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
			<GeneralModal
				visible={visible}
				header={
					"Are you sure you want to remove " +
					user.name +
					" from this club?"
				}
				functionOnConfirm={() => {
					removeClubMember(user.id);
				}}
				closeFunction={() => setVisible(false)}
				content={
					"This action is not reversible and " +
					user.name +
					" will have to sign up again if they wish to rejoin the club."
				}
				modalType={"warning"}
			/>
		</>
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
