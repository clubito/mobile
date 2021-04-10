import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Layout, List } from "@ui-kitten/components";
import UserService from "../../services/UserService";
import SettingsToggle from "../../components/SettingsToggle";
import LoadingScreen from "../../components/LoadingScreen";

const NotificationSettingsScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [globalToggle, setGlobalToggle] = useState(true);
	const [clubToggles, setClubToggles] = useState([{}]);

	useEffect(() => {
		UserService.getCurrentUserNotificationSettings().then((data) => {
			setGlobalToggle(data.enabled);
			setClubToggles(data.clubs);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View>
			<Layout style={styles.topLevel}>
				<SettingsToggle
					text="Global Notifications"
					enabled={globalToggle}
					onToggle={(state) => {
						setGlobalToggle(state);
						UserService.setGlobalNotificationsEnabled(state);
					}}
				/>
			</Layout>

			<Layout>
				<List
					data={clubToggles}
					keyExtractor={(item) => item.clubId}
					ItemSeparatorComponent={Divider}
					renderItem={({ item, index }) => (
						<SettingsToggle
							text={item.name}
							enabled={item.enabled}
							onToggle={(state) => {
								setClubToggles((oldToggles) => {
									oldToggles[index] = {
										enabled: state,
										id: item.id,
										name: item.name,
									};
									return Array.from(oldToggles);
								});

								UserService.setClubNotificationsEnabled(
									item.id,
									state
								);
							}}
						/>
					)}
				/>
			</Layout>
		</View>
	);
};

const styles = StyleSheet.create({
	topLevel: {
		marginBottom: 16,
	},
});

export default NotificationSettingsScreen;
