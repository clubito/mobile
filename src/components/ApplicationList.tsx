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
import GeneralModal from "./GeneralModal";
import ClubService from "../services/ClubService";
import EventService from "../services/EventService";
import { getReadableDate } from "../utils";

type Props = {
	applicants: JoinRequest[];
	clubId: string;
	clubName: string;
	role: string;
	update: Function;
};

const ApplicationList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [visible, setVisible] = useState(false);
	const [approval, setApproval] = useState(false);
	const [curUserName, setCurUserName] = useState("");
	const [curUserId, setCurUserId] = useState("");

	const submit = () => {
		props.update(approval, props.clubId, curUserId);
		//TODO: Add toast
		setVisible(false);
	};

	const triggerModal = (isApprove: boolean, name: string, id: string) => {
		setApproval(isApprove);
		setCurUserId(id);
		setCurUserName(name);
		setVisible(true);
	};

	return (
		<>
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
										style={[
											styles.button,
											{ marginRight: 5 },
										]}
										status="success"
										accessoryLeft={() => (
											<Icon
												name="checkmark-outline"
												style={styles.icon}
												fill="white"
											/>
										)}
										onPress={() => {
											triggerModal(
												true,
												item.name,
												item.id
											);
										}}
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
										onPress={() => {
											triggerModal(
												false,
												item.name,
												item.id
											);
										}}
									/>
								</View>
							)}
						/>
					);
				}}
			/>
			<GeneralModal
				visible={visible}
				header={"Club Member " + (approval ? "Approval" : "Rejection")}
				functionOnConfirm={() => submit()}
				closeFunction={() => {
					setVisible(false);
				}}
				content={
					"Are you sure you want to " +
					(approval ? "approve " : "reject ") +
					curUserName +
					"'s application into " +
					props.clubName +
					"?"
				}
				modalType={approval ? "success" : "warning"}
			/>
		</>
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
