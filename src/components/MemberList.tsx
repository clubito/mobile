import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
	Avatar,
	Text,
	Card,
	Button,
	Icon,
	Modal,
	Input,
	ListItem,
	Divider,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { User } from "../types";
import { ContainerStyles } from "../styles/CommonStyles";
import EmptyView from "./EmptyView";
import CoolView from "./CoolView";

type Props = {
	members: User[];
	role?: string;
	clubId?: string;
	update?: Function;
};

const MemberList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const isAdmin = props.role === "OWNER";
	const [visible, setVisible] = React.useState(false);
	const [user, setUser] = React.useState({} as User);
	const [kickReason, setKickReason] = React.useState("");

	const removeClubMember = (userId: string) => {
		setVisible(false);
		if (props.update) props.update(props.clubId, userId, kickReason);
	};

	const triggerModal = (user: User) => {
		setVisible(true);
		setUser(user);
	};
	return props.members.length > 0 ? (
		<CoolView>
			<FlatList
				data={props.members}
				ItemSeparatorComponent={Divider}
				ListFooterComponent={Divider}
				renderItem={({ item }) => {
					return (
						<ListItem
							style={styles.memberContainer}
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
							description={
								"Member since " +
								dayjs(item.approvalDate).format("MM/DD/YYYY")
							}
							accessoryLeft={() => (
								<Avatar
									source={{ uri: item.profilePicture }}
									size="small"
								/>
							)}
							accessoryRight={() =>
								isAdmin && props.clubId && props.update ? (
									<Button
										style={styles.deleteButton}
										appearance="ghost"
										onPress={() => triggerModal(item)}
										accessoryLeft={() => (
											<Icon
												name="close-outline"
												style={styles.icon}
												fill="#EF5350"
											/>
										)}
									/>
								) : (
									<></>
								)
							}
						/>
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
		</CoolView>
	) : (
		<EmptyView message="Ain't nobody here :|" />
	);
};
const styles = StyleSheet.create({
	memberContainer: {
		paddingHorizontal: 16,
		backgroundColor: "transparent",
	},
	deleteButton: {
		width: 35,
		height: 35,
	},
	icon: {
		width: 30,
		height: 30,
	},
	button: {
		width: 35,
		height: 35,
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

export default MemberList;
