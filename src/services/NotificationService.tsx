import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import API from "./API";

export default class NotificationService {
	static nav: any;

	static async registerDevice() {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: true,
				shouldSetBadge: false,
			}),
		});

		if (Constants.isDevice) {
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();
			
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const {
					status,
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			
			// Fetch and send expo device token to backend
			const token: string = (await Notifications.getExpoPushTokenAsync()).data;
			await API.post("/user/notifications/register", {
				pushToken: token,
			});
		} else {
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
	}

	static setNavigator(nav: any) {
		this.nav = nav;
		Notifications.addNotificationResponseReceivedListener((event) =>
			this.handleNotification(event.notification.request.content)
		);
	}

	static handleNotification(notification: Notifications.NotificationContent) {
		let navigator, screen: string;
		switch (notification.data.type) {
			case "event":
				navigator = "EventNavigator";
				screen = "Event";
				break;
			case "club":
				navigator = "ClubNavigator";
				screen = "Club";
				break;
			case "chat":
				navigator = "ChatNavigator";
				screen = "Chat";
				break;
			default:
				this.nav.navigate("Home");
				return;
		}

		this.nav.push("NotificationNavigator", {
			screen: navigator,
			params: {
				screen: screen,
				title: notification.data.title,
				params: {
					id: notification.data.id,
					title: notification.data.title,
					role: notification.data.role,
				},
			},
		});
	}
}
