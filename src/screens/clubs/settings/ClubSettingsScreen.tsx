import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import CoolDivider from "../../../components/CoolDivider";
import SettingsButton from "../../../components/SettingsButton";
import GeneralModal from "../../../components/GeneralModal";
import ClubService from "../../../services/ClubService";
import { hasPermission, RolePermissions } from "../../../utils/permissions";
import FormColorPicker from "../../../components/FormColorPicker";
import LoadingScreen from "../../../components/LoadingScreen";

type ClubSettingsRouteProp = RouteProp<ClubParamList, "ClubSettings">;
type Props = {
	route: ClubSettingsRouteProp;
};

const ClubSettingsScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const role = props.route.params.role;
	const nav = useNavigation();
	const [theme, setTheme] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		ClubService.getClub(props.route.params.clubId)
			.then((data) => {
				setTheme(data.theme);
				setIsLoading(false);
			})
			.catch((error) => {
				toast?.show(error.message, {
					type: "danger",
				});
			});
	}, []);

	const updateTheme = (newTheme: string) => {
		if (newTheme.match(/^#([0-9a-f]{6}|[0-9a-f]{3})$/i))
			ClubService.changeTheme(props.route.params.clubId, newTheme)
				.then((data) => {
					toast?.show(data.message, {
						type: "success",
					});
				})
				.catch((error) => {
					toast?.show(error.message, {
						type: "danger",
					});
				});
		else
			toast?.show("Invalid color hex format", {
				type: "danger",
			});
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

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

			<View style={styles.divider} />

			<FormColorPicker
				id="theme"
				initColor={theme ? theme : "#ffffff"}
				label="Select Theme Color"
				functionOnConfirm={(str) => {
					setTheme(str);
					updateTheme(str);
				}}
			/>

			<View style={styles.divider} />

			{/* TODO: Add Conditional to ensure only club president can see button  */}
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
					ClubService.deleteClub(props.route.params.clubId)
						.then((data) => {
							nav.navigate("Home");
							toast?.show(data.message, {
								type: "success",
							});
						})
						.catch((error) => {
							toast?.show(error.message, {
								type: "danger",
							});
						});
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
		height: 24,
		backgroundColor: "transparent",
	},
});
export default ClubSettingsScreen;
