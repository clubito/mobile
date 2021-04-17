import React from "react";
import { View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import CoolDivider from "../../../components/CoolDivider";
import SettingsButton from "../../../components/SettingsButton";

type ClubSettingsRouteProp = RouteProp<ClubParamList, "ClubSettings">;
type Props = {
	route: ClubSettingsRouteProp;
};

const ClubSettingsScreen = (props: Props) => {
	const nav = useNavigation();

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
		</View>
	);
};

export default ClubSettingsScreen;
