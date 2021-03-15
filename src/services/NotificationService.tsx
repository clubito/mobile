import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export default class NotificationService {

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

			const token: string = (await Notifications.getExpoPushTokenAsync()).data;

			// TODO: testing only, remove once notifications work
			await AsyncStorage.setItem("test_notif_token","TOK: " + token);
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

		Notifications.addNotificationReceivedListener(this.handleNotification);
    	Notifications.addNotificationResponseReceivedListener(this.handleNotificationResponse);
	}

	static handleNotificationResponse(response: any) {
		console.log(response);
	}

	static handleNotification(notification: any) {
		console.log(notification);
	}
}
