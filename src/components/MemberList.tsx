import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Text,
	List,
	Card,
	Button,
	Icon,
	Layout,
	Modal,
	Input,
} from "@ui-kitten/components";
import { User } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import GeneralModal from "./GeneralModal";
import { SafeAreaView } from "react-native-safe-area-context";
import ClubService from "../services/ClubService";
import { ContainerStyles } from "../styles/CommonStyles";

type Props = {
	members: User[];
	role: string;
	clubId: string;
	update: Function;
};

const MemberList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const isAdmin = props.role === "OWNER";
	const [visible, setVisible] = React.useState(false);
	const [user, setUser] = React.useState({} as User);
	const [kickReason, setKickReason] = React.useState("");

	const removeClubMember = (userId: string) => {
		setVisible(false);
		console.log(props.clubId);
		props.update(props.clubId, userId, kickReason);
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
			<Modal
				visible={visible}
				backdropStyle={ContainerStyles.modalBackdrop}
				onBackdropPress={() => setVisible(false)}
			>
				<Card
					header={() => (
						<View style={{ margin: 10 }}>
							<Text category="h6">
								{"Are you sure you want to remove " +
									user.name +
									" from this club?"}
							</Text>
						</View>
					)}
					footer={() => (
						<View
							style={
								(ContainerStyles.flexContainer,
								{ flexDirection: "row" })
							}
						>
							<Button
								onPress={() => setVisible(false)}
								style={{ flex: 1, margin: 10 }}
							>
								Cancel
							</Button>
							<Button
								onPress={() => {
									removeClubMember(user.id);
								}}
								style={{ flex: 1, margin: 10 }}
								status={"warning"}
							>
								Confirm
							</Button>
						</View>
					)}
					status={"warning"}
					style={ContainerStyles.extraMargin}
				>
					<Text style={ContainerStyles.lowerMargin}>
						{"This action is not reversible and " +
							user.name +
							" will have to sign up again if they wish to rejoin the club."}
					</Text>
					<Text category="c1">Reason for Removing Member</Text>
					<Input
						placeholder="Reason for removing member"
						onChangeText={(nextValue) => setKickReason(nextValue)}
					/>
				</Card>
			</Modal>
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
