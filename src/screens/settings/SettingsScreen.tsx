import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Layout } from "@ui-kitten/components";
import { AuthContext } from "../../context/AuthContext";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import SettingsItem from "../../components/SettingsItem";
import GeneralModal from "../../components/GeneralModal";
import { ContainerStyles } from "../../styles/CommonStyles";

const SettingsScreen = () => {
	const nav = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(0);
	const { logOutSuccess } = useContext(AuthContext);
	const [enableNotifications, setNotificationsEnabled] = useState(true);

	return (
		<Layout>
			<SettingsItem
				text="Notifications"
				enabled={enableNotifications}
				onToggle={(state) => {
					setNotificationsEnabled(state);
					UserService.setNotificationsEnabled(state);
				}}
			/>
			<Layout style={ContainerStyles.containerStart}>
				<Button
					appearance="ghost"
					onPress={() => {
						setModalType(0);
						setModalVisible(true);
					}}
					status="warning"
				>
					Logout
				</Button>
			</Layout>
			<Layout style={ContainerStyles.containerStart}>
				<Button
					appearance="ghost"
					onPress={() => {
						setModalType(1);
						setModalVisible(true);
					}}
					status="danger"
				>
					Delete Account
				</Button>
			</Layout>
			<GeneralModal
				visible={modalVisible}
				closeFunction={() => setModalVisible(false)}
				header={
					modalType == 0
						? "Are you sure you want to log out?"
						: "Are you sure you want to delete your account?"
				}
				functionOnConfirm={
					modalType == 0
						? () => {
								AuthService.logout().then(() => {
									nav.navigate("Home");
									if (toast)
										toast.show("Successfully logged out", {
											type: "success",
										});
									logOutSuccess();
								});
						  }
						: () => {
								UserService.deleteUser().then(() => {
									nav.navigate("Home");
									if (toast)
										toast.show(
											"Your account has been successfully deleted",
											{
												type: "success",
											}
										);
									logOutSuccess();
								});
						  }
				}
				content={
					modalType == 0
						? "Are you sure you want to log out? Your user data will be removed from this device."
						: "Are you sure you want to delete your account? Your user data will be removed from the database and you will no longer be able to log in. This action is irreversible."
				}
				modalType={modalType == 0 ? "warning" : "danger"}
			/>
		</Layout>
	);
};

export default SettingsScreen;
