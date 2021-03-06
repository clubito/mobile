import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ClubNotificationSetting } from "../../types";
import UserService from "../../services/UserService";
import SettingsToggle from "../../components/SettingsToggle";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";
import CoolDivider from "../../components/CoolDivider";

const NotificationSettingsScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [globalToggle, setGlobalToggle] = useState(true);
	const [clubToggles, setClubToggles] = useState(
		[] as ClubNotificationSetting[]
	);

	useEffect(() => {
		UserService.getCurrentUserNotificationSettings().then((data) => {
			setGlobalToggle(data.enabled);
			setClubToggles(data.clubs);
			setIsLoading(false);
		});
	}, []);

	const setClubNotifications = () => {
		const disabledClubs: string[] = [];
		clubToggles.forEach((clubToggle) => {
			if (!clubToggle.enabled) disabledClubs.push(clubToggle.id);
		});
		UserService.setClubNotifications(disabledClubs);
	};
	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View>
			<CoolView style={styles.topLevel} yip>
				<SettingsToggle
					text="Global Notifications"
					enabled={globalToggle}
					onToggle={(state) => {
						setGlobalToggle(state);
						UserService.setGlobalNotificationsEnabled(state);
					}}
				/>
			</CoolView>

			<CoolView yip>
				<FlatList
					data={clubToggles}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={CoolDivider}
					renderItem={({ item, index }) => (
						<SettingsToggle
							text={item.name}
							avatar={item.logo}
							enabled={item.enabled}
							onToggle={(state) => {
								setClubToggles((oldToggles) => {
									oldToggles[index] = {
										enabled: state,
										id: item.id,
										name: item.name,
										logo: item.logo,
									};
									return Array.from(oldToggles);
								});

								setClubNotifications();
							}}
						/>
					)}
				/>
			</CoolView>
		</View>
	);
};

const styles = StyleSheet.create({
	topLevel: {
		marginBottom: 16,
	},
});

export default NotificationSettingsScreen;
