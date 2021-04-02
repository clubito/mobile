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

		console.log("1");
		if (Constants.isDevice) {
			console.log("2");
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();
			
			console.log("3");
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				console.log("4");
				const {
					status,
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			console.log("5");
			
			if (finalStatus !== "granted") {
				console.log("6");
				alert("Failed to get push token for push notification!");
				return;
			}
			
			console.log("7");
			// Fetch and send expo device token to backend
			const token: string = (await Notifications.getExpoPushTokenAsync()).data;
			console.log("8");
			await API.post("/user/notifications/register", {
				pushToken: token,
			}).then(s=> {
				console.log("8");
				console.log(s);
			}).catch(e=> {
				console.log("9");
				console.log(e);
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
				screen = "ChatScreen";
				break;
			default:
				this.nav.navigate("Home");
				return;
		}

		this.nav.navigate("NotificationNavigator", {
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
