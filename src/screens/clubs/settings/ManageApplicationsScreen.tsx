import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Text, Button, Icon, Avatar } from "@ui-kitten/components";
import { Club, JoinRequest } from "../../../types";
import { getReadableDate } from "../../../utils";
import { ClubParamList } from "../ClubNavigator";
import ClubService from "../../../services/ClubService";
import CoolListItem from "../../../components/CoolListItem";
import CoolView from "../../../components/CoolView";
import EmptyView from "../../../components/EmptyView";
import GeneralModal from "../../../components/GeneralModal";
import LoadingScreen from "../../../components/LoadingScreen";

type Route = RouteProp<ClubParamList, "ManageApplications">;
type Props = {
	route: Route;
};

const ManageApplicationsScreen = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isLoading, setIsLoading] = useState(true);
	const [club, setClub] = useState({} as Club);
	const [applicants, setApplicants] = useState({} as JoinRequest[]);

	const [visible, setVisible] = useState(false);
	const [approval, setApproval] = useState(false);
	const [curUserName, setCurUserName] = useState("");
	const [curUserId, setCurUserId] = useState("");

	useEffect(() => {
		load();
	}, []);

	const triggerModal = (isApprove: boolean, name: string, id: string) => {
		setApproval(isApprove);
		setCurUserId(id);
		setCurUserName(name);
		setVisible(true);
	};

	const load = () => {
		Promise.all([
			ClubService.getClub(props.route.params.clubId),
			ClubService.getApplicants(props.route.params.clubId),
		])
			.then((result: [Club, JoinRequest[]]) => {
				setClub(result[0]);
				setApplicants(result[1]);
			})
			.catch((error) =>
				toast?.show(error.message, {
					type: "danger",
				})
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	const submit = (approval: boolean, userId: string) => {
		if (approval) {
			ClubService.approveApplication(club.id, userId)
				.then((data) => {
					load();
					toast?.show(data.message, {
						type: "success",
					});
				})
				.catch((error) =>
					toast?.show(error.message, {
						type: "danger",
					})
				);
		} else {
			ClubService.rejectApplication(club.id, userId)
				.then((data) => {
					load();
					toast?.show(data.message, {
						type: "success",
					});
				})
				.catch((error) =>
					toast?.show(error.message, {
						type: "danger",
					})
				);
		}
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return applicants.length > 0 ? (
		<CoolView yip>
			<FlatList
				data={applicants}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return (
						<CoolListItem
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
				functionOnConfirm={() => submit(approval, curUserId)}
				closeFunction={() => {
					setVisible(false);
				}}
				content={
					"Are you sure you want to " +
					(approval ? "approve " : "reject ") +
					curUserName +
					"'s application into " +
					club.name +
					"?"
				}
				modalType={approval ? "success" : "warning"}
			/>
		</CoolView>
	) : (
		<EmptyView message="No applications available" />
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

export default ManageApplicationsScreen;
