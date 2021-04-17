import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button, CheckBox, Text } from "@ui-kitten/components";
import ClubService from "../../../services/ClubService";
import { ClubParamList } from "../ClubNavigator";
import CoolInput from "../../../components/CoolInput";
import CoolDivider from "../../../components/CoolDivider";
import CoolView from "../../../components/CoolView";
import LoadingScreen from "../../../components/LoadingScreen";

type Route = RouteProp<ClubParamList, "AddEditRole">;
type Props = {
	route: Route;
};

const permissionList = [
	{ name: "ADD_ANNOUNCEMENTS", label: "Add Announcements", isChecked: false },
	{ name: "ADD_EDIT_EVENTS", label: "Add/Edit Events", isChecked: false },
	{ name: "MANAGE_MEMBERS", label: "Manage Members", isChecked: false },
	{ name: "MANAGE_ROLES", label: "Manage Roles", isChecked: false },
];

const AddEditRoleScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const roleId = props.route.params.roleId;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [roleName, setRoleName] = useState("");
	const [rolePermissions, setRolePermissions] = useState(permissionList);

	useEffect(() => {
		if (roleId) {
			setIsLoading(true);
			ClubService.getRole(roleId)
				.then((role) => {
					setRoleName(role.name);
					setRolePermissions((oldPermissions) => {
						role.permissions.map((perm) => {
							oldPermissions.map((oldPerm) => {
								return perm === oldPerm.name
									? { ...oldPerm, isChecked: true }
									: oldPerm;
							});
						});

						return oldPermissions.slice(0);
					});
				})
				.finally(() => setIsLoading(false));
		}
	}, []);

	const handleCheck = (pos: number, checked: boolean) => {
		rolePermissions[pos].isChecked = checked;
		setRolePermissions(rolePermissions.slice(0));
	};

	const handleSave = () => {
		roleId
			? ClubService.editRole(clubId, roleId, roleName, [])
					.then(() => {
						toast?.show("", { type: "success" });
						navigation.goBack();
					})
					.catch(() =>
						toast?.show("Failed to save role", { type: "danger" })
					)
			: ClubService.createRole(clubId, roleName, [])
					.then(() => {
						toast?.show("", { type: "success" });
						navigation.goBack();
					})
					.catch(() =>
						toast?.show("Failed to save role", { type: "danger" })
					);
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View>
			<CoolView style={styles.container} yip>
				<Text category="s2" style={styles.label}>
					Name
				</Text>

				<CoolInput placeholder="Name" onChangeText={setRoleName} />
			</CoolView>

			<View style={styles.divider} />

			<CoolView style={styles.permContainer} yip>
				<Text category="s2">Permissions</Text>

				<FlatList
					data={rolePermissions}
					keyExtractor={(item) => item.name}
					ItemSeparatorComponent={CoolDivider}
					renderItem={({ item, index }) => (
						<CheckBox
							style={styles.checkBox}
							checked={item.isChecked}
							onChange={(checked) => handleCheck(index, checked)}
						>
							<Text style={styles.checkBoxText}>
								{item.label}
							</Text>
						</CheckBox>
					)}
				/>
			</CoolView>

			<View style={styles.divider} />

			<View style={styles.buttonContainer}>
				<Button onPress={handleSave}>Save</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	permContainer: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
	},
	buttonContainer: {
		paddingHorizontal: 16,
	},
	divider: {
		height: 16,
		backgroundColor: "transparent",
	},
	label: {
		paddingBottom: 8,
	},
	checkBox: {
		paddingVertical: 16,
	},
	checkBoxText: {
		fontSize: 14,
	},
});

export default AddEditRoleScreen;
