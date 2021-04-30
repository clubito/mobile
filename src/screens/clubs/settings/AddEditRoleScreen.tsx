import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button, CheckBox, Text } from "@ui-kitten/components";
import ClubService from "../../../services/ClubService";
import { getRoleLabel } from "../../../utils/permissions";
import { ClubParamList } from "../ClubNavigator";
import CoolInput from "../../../components/CoolInput";
import CoolDivider from "../../../components/CoolDivider";
import CoolView from "../../../components/CoolView";
import GeneralModal from "../../../components/GeneralModal";

type Route = RouteProp<ClubParamList, "AddEditRole">;
type Props = {
	route: Route;
};

const permissionList = [
	{ name: "ADD_ANNOUNCEMENTS", isChecked: false },
	{ name: "ADD_EDIT_EVENTS", isChecked: false },
	{ name: "MANAGE_APPLICATIONS", isChecked: false },
	{ name: "MANAGE_MEMBERS", isChecked: false },
	{ name: "MANAGE_ROLES", isChecked: false },
];

const AddEditRoleScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const role = props.route.params.role;
	const navigation = useNavigation();
	const [roleName, setRoleName] = useState("");
	const [rolePermissions, setRolePermissions] = useState(permissionList);
	const [showRemoveModal, setShowRemoveModal] = useState(false);

	useEffect(() => {
		if (!role) {
			permissionList.forEach((perm) => {
				perm.isChecked = false;
			});
			setRolePermissions(permissionList.slice(0));
			return;
		}

		setRoleName(role.name);
		setRolePermissions((oldPermissions) => {
			return oldPermissions.map((oldPerm) => {
				let update = oldPerm;
				role.permissions.map((perm) => {
					if (perm === oldPerm.name) {
						update = {
							...update,
							isChecked: true,
						};
					}
				});

				return update;
			});
		});
	}, []);

	const handleCheck = (pos: number, checked: boolean) => {
		rolePermissions[pos].isChecked = checked;
		setRolePermissions(rolePermissions.slice(0));
	};

	const handleSave = () => {
		role
			? ClubService.editRole(role.id, roleName, getPerms())
					.then(() => {
						toast?.show("Role updated successfully", {
							type: "success",
						});
						navigation.goBack();
					})
					.catch((error) =>
						toast?.show("Failed to update role", { type: "danger" })
					)
			: ClubService.createRole(clubId, roleName, getPerms())
					.then(() => {
						toast?.show("Role created successfully", {
							type: "success",
						});
						navigation.goBack();
					})
					.catch(() =>
						toast?.show("Failed to save role", { type: "danger" })
					);
	};

	const deleteRole = () => {
		setShowRemoveModal(false);
		ClubService.deleteRole(role.id)
			.then((response) => {
				toast?.show(response.message, {
					type: "success",
				});
				navigation.goBack();
			})
			.catch((error) => {
				toast?.show(error.message, {
					type: "danger",
				});
			});
	};

	const getPerms = (): string[] => {
		const perms: string[] = [];
		rolePermissions.forEach((perm) => {
			if (perm.isChecked) {
				perms.push(perm.name);
			}
		});
		return perms;
	};

	return (
		<View style={styles.container}>
			<CoolView style={styles.nameContainer} yip>
				<Text category="s2" style={styles.label}>
					Name
				</Text>

				<CoolInput
					placeholder="Name"
					value={roleName}
					onChangeText={setRoleName}
					disabled={role && role.preset}
				/>
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
							disabled={role && role.preset}
							onChange={(checked) => handleCheck(index, checked)}
						>
							<Text style={styles.checkBoxText}>
								{getRoleLabel(item.name)}
							</Text>
						</CheckBox>
					)}
				/>
			</CoolView>

			<View style={styles.divider} />

			{(!role || !role.preset) && (
				<View style={styles.buttonContainer}>
					<Button onPress={handleSave}>Save</Button>
				</View>
			)}

			{role && !role.preset && (
				<>
					<View style={styles.removeContainer}>
						<Button
							status="danger"
							onPress={() => setShowRemoveModal(true)}
						>
							Delete Role
						</Button>
					</View>

					<GeneralModal
						visible={showRemoveModal}
						header="Delete Role"
						content={
							"Are you sure you want to delete " + role.name + "?"
						}
						onConfirm={deleteRole}
						onDismiss={() => setShowRemoveModal(false)}
						status="danger"
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	nameContainer: {
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
	removeContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
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
