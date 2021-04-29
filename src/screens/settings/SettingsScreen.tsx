import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import SettingsButton from "../../components/SettingsButton";
import GeneralModal from "../../components/GeneralModal";
import SettingsToggle from "../../components/SettingsToggle";
import CoolDivider from "../../components/CoolDivider";

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
		<View>
			<SettingsButton
				text="Notifications"
				icon="bell-outline"
				onPress={() => {
					nav.navigate("NotificationSettings");
				}}
				hasChildScreen
			/>

			<CoolDivider />

			<SettingsToggle
				text="Dark Mode"
				icon="moon-outline"
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

			<CoolDivider />

			<SettingsButton
				text="Create Club"
				icon="people-outline"
				onPress={() => {
					nav.navigate("CreateClub");
				}}
				hasChildScreen
			/>

			<View style={styles.divider} />

			<SettingsButton
				text="Logout"
				onPress={() => {
					setModalType(0);
					setModalVisible(true);
				}}
			/>

			<View style={styles.divider} />

			<SettingsButton
				text="Delete Account"
				onPress={() => {
					setModalType(1);
					setModalVisible(true);
				}}
			/>

			<GeneralModal
				visible={modalVisible}
				onDismiss={() => setModalVisible(false)}
				header={
					modalType == 0
						? "Are you sure you want to log out?"
						: "Are you sure you want to delete your account?"
				}
				onConfirm={
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
				status={modalType == 0 ? "warning" : "danger"}
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

export default SettingsScreen;
