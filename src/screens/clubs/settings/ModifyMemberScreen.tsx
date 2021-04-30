import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Avatar, Button, Text } from "@ui-kitten/components";
import { ClubParamList } from "../ClubNavigator";
import { Role } from "../../../types";
import { getReadableDate } from "../../../utils";
import ClubService from "../../../services/ClubService";
import AssignRoleModal from "../../../components/AssignRoleModal";
import CoolDivider from "../../../components/CoolDivider";
import CoolView from "../../../components/CoolView";
import LoadingScreen from "../../../components/LoadingScreen";
import RemoveUserModal from "../../../components/RemoveUserModal";
import { getRoleLabel } from "../../../utils/permissions";

type Route = RouteProp<ClubParamList, "ModifyMember">;
type Props = {
	route: Route;
};

const ModifyMemberScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const user = props.route.params.user;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
	const [showRemoveModal, setShowRemoveModal] = useState(false);
	const [userRole, setUserRole] = useState<Role>(user.role!);
	const [roles, setRoles] = useState<Role[]>([]);

	useEffect(() => {
		ClubService.getAllRoles(clubId)
			.then((roles) => setRoles(roles))
			.finally(() => setIsLoading(false));
	}, []);

	const assignRole = (role: Role) => {
		setShowAssignRoleModal(false);
		ClubService.assignMemberRole(clubId, user.id, role.id)
			.then(() => {
				setUserRole(role);
				toast?.show("Successfully assigned role", {
					type: "success",
				});
			})
			.catch((error) => {
				toast?.show(error.message, {
					type: "danger",
				});
			});
	};

	const removeMember = (reason: string) => {
		setShowRemoveModal(false);
		ClubService.removeMember(clubId, user.id, reason)
			.then(() => {
				toast?.show("Successfully removed member", {
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

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View style={styles.container}>
			<CoolView style={styles.topContainer} yip>
				<Avatar
					style={styles.profileAvatar}
					source={{ uri: user.profilePicture }}
				/>

				<Text category="h6">{user.name}</Text>
			</CoolView>

			<CoolDivider />

			<CoolView style={styles.botContainer} yip>
				<Text category="s2" appearance="hint">
					Joined
				</Text>
				<Text>{getReadableDate(user.approvalDate!, true)}</Text>
			</CoolView>

			<CoolDivider />

			<CoolView style={styles.botContainer} yip>
				<Text category="s2" appearance="hint">
					Role
				</Text>
				<Text>{userRole.name}</Text>
				{userRole.permissions.map((perm) => (
					<Text appearance="hint">
						{"  \u2022 " + getRoleLabel(perm)}
					</Text>
				))}
			</CoolView>

			<View style={styles.botContainer}>
				<Button
					status="info"
					onPress={() => setShowAssignRoleModal(true)}
				>
					Assign Role
				</Button>
			</View>

			<View style={styles.removeContainer}>
				<Button
					status="danger"
					onPress={() => setShowRemoveModal(true)}
				>
					Remove From Club
				</Button>
			</View>

			<AssignRoleModal
				roles={roles}
				visible={showAssignRoleModal}
				onConfirm={assignRole}
				onDismiss={() => setShowAssignRoleModal(false)}
			/>

			<RemoveUserModal
				userName={user.name}
				visible={showRemoveModal}
				onConfirm={removeMember}
				onDismiss={() => setShowRemoveModal(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		alignItems: "center",
	},
	botContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	removeContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
	profileAvatar: {
		width: 100,
		height: 100,
		marginBottom: 16,
	},
});

export default ModifyMemberScreen;
