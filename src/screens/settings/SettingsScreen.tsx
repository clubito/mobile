import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Divider, Layout } from "@ui-kitten/components";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import SettingsButton from "../../components/SettingsButton";
import GeneralModal from "../../components/GeneralModal";
import { ContainerStyles } from "../../styles/CommonStyles";
import SettingsToggle from "../../components/SettingsToggle";

const SettingsScreen = () => {
	const nav = useNavigation();
	const { logOutSuccess } = useContext(AuthContext);
	const { toggleTheme } = useContext(ThemeContext);
	const [enableDarkMode, setDarkModeEnabled] = useState(false);

	const [modalType, setModalType] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);


	useEffect(() => {
		AsyncStorage.getItem("setting_dark_mode_enabled").then((state) => {
			setDarkModeEnabled(state === "true");
		});
	}, []);

	return (
		<Layout>
			<SettingsButton
				text="Notifications"
				onPress={() => {
					nav.navigate("NotificationSettings");
				}}
			/>

			<Divider />

			<SettingsToggle
				text="Dark Mode"
				enabled={enableDarkMode}
				onToggle={(state) => {
					setDarkModeEnabled(state);
					toggleTheme();
					AsyncStorage.setItem(
						"setting_dark_mode_enabled",
						state.toString()
					);
				}}
			/>

			<Divider />

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

			<Divider />

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
