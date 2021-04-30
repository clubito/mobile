import React from "react";
import { View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import CoolDivider from "../../../components/CoolDivider";
import SettingsButton from "../../../components/SettingsButton";
import { hasPermission, RolePermissions } from "../../../utils/permissions";

type ClubSettingsRouteProp = RouteProp<ClubParamList, "ClubSettings">;
type Props = {
	route: ClubSettingsRouteProp;
};

const ClubSettingsScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const role = props.route.params.role;
	const nav = useNavigation();

	return (
		<View>
			{hasPermission(role, RolePermissions.MANAGE_APPLICATIONS) && (
				<>
					<SettingsButton
						hasChildScreen
						text="Manage Applications"
						icon="layers-outline"
						onPress={() => {
							nav.navigate("ManageApplications", {
								clubId: clubId,
							});
						}}
					/>

					<CoolDivider />
				</>
			)}

			{hasPermission(role, RolePermissions.MANAGE_MEMBERS) && (
				<>
					<SettingsButton
						hasChildScreen
						text="Manage Members"
						icon="people-outline"
						onPress={() => {
							nav.navigate("ManageMembers", {
								clubId: clubId,
							});
						}}
					/>

					<CoolDivider />
				</>
			)}

			{hasPermission(role, RolePermissions.MANAGE_ROLES) && (
				<>
					<SettingsButton
						hasChildScreen
						text="Manage Roles"
						icon="options-outline"
						onPress={() => {
							nav.navigate("ManageRoles", {
								clubId: clubId,
							});
						}}
					/>
				</>
			)}
		</View>
	);
};

export default ClubSettingsScreen;
