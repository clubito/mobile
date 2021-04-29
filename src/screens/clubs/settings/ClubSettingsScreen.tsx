import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import CoolDivider from "../../../components/CoolDivider";
import SettingsButton from "../../../components/SettingsButton";
import GeneralModal from "../../../components/GeneralModal";
import ClubService from "../../../services/ClubService";

type ClubSettingsRouteProp = RouteProp<ClubParamList, "ClubSettings">;
type Props = {
	route: ClubSettingsRouteProp;
};

const ClubSettingsScreen = (props: Props) => {
	const nav = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View>
			<SettingsButton
				hasChildScreen
				text="Applications"
				icon="layers-outline"
				onPress={() => {
					nav.navigate("ManageApplications", {
						clubId: props.route.params.clubId,
					});
				}}
			/>

			<CoolDivider />

			<SettingsButton
				hasChildScreen
				text="Manage Members"
				icon="people-outline"
				onPress={() => {
					nav.navigate("ManageMembers", {
						clubId: props.route.params.clubId,
					});
				}}
			/>

			<CoolDivider />

			<SettingsButton
				hasChildScreen
				text="Manage Roles"
				icon="options-outline"
				onPress={() => {
					nav.navigate("ManageRoles", {
						clubId: props.route.params.clubId,
					});
				}}
			/>
			<View style={styles.divider} />

			{/* TODO: Add Conditional to ensure only club president can see button */}
			<SettingsButton
				text="Delete Club"
				onPress={() => {
					setModalVisible(true);
				}}
			/>

			<GeneralModal
				visible={modalVisible}
				onDismiss={() => setModalVisible(false)}
				header={"Are you sure you want to delete this club?"}
				onConfirm={() => {
					ClubService.deleteClub(props.route.params.clubId).then(
						(data) => {
							nav.navigate("Home");
							toast?.show(data.message, {
								type: "success",
							});
						}
					);
				}}
				content={
					"Are you sure you want to delete this club? Your club data will be removed from the database and club members will no longer be able to access this club. This action is irreversible."
				}
				status={"danger"}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	divider: {
		height: 16,
		backgroundColor: "transparent",
	},
});
export default ClubSettingsScreen;
