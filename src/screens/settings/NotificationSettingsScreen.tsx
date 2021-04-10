import React, { useEffect, useState } from "react";
import { Divider, Layout, List } from "@ui-kitten/components";
import UserService from "../../services/UserService";
import SettingsItem from "../../components/SettingsItem";
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
		<Layout>
			<SettingsItem
				text="Global Notifications"
				enabled={globalToggle}
				onToggle={(state) => {
					setGlobalToggle(state);
					UserService.setGlobalNotificationsEnabled(state);
				}}
			/>

			<Divider />

			<List
				data={clubToggles}
				keyExtractor={(item) => item.clubId}
				ItemSeparatorComponent={Divider}
				renderItem={({ item, index }) => (
					<SettingsItem
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
	);
};

export default NotificationSettingsScreen;
