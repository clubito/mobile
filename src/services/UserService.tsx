import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import API from "./API";
import ImageService from "./ImageService";
import { User } from "../types";

export default class UserService {
	/**
	 * Setup the current user's profile.
	 * Only called once per account after signup.
	 */
	static async setupProfile(props: {
		name?: string;
		profilePicture?: string;
		tags?: string[];
	}) {
		await this.updateCurrentUser(props);
		await AsyncStorage.setItem("is_user_profile_setup", "true");
	}

	/**
	 * Get current user profile from backend.
	 */
	static async getCurrentUser() {
		const response: AxiosResponse<User> = await API.get<User>(
			"/user/profile"
		);
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.statusText,
			};
		}
		return response.data;
	}

	/**
	 * Get current user settings from backend
	 */
	static async getCurrentUserNotificationSettings() {
		// const response: AxiosResponse<NotificationSettings> = await API.get<NotificationSettings>(
		// 	"/user/settings"
		// );
		// if (response.status !== 200) {
		// 	throw {
		// 		code: response.status,
		// 		message: response.statusText,
		// 	};
		// }
		// return response.data;

		// Dummy return until backend is setup
		return {
			enabled: true,
			clubs: [
				{
					enabled: true,
					id: "id1",
					name: "LOL",
				},
				{
					enabled: false,
					id: "id2",
					name: "LMAO",
				},
				{
					enabled: true,
					id: "id3",
					name: "ROFL",
				},
				{
					enabled: false,
					id: "id4",
					name: "FUCK",
				},
			],
		};
	}

	/**
	 * Delete current user from backend
	 */
	static async deleteUser() {
		const response: AxiosResponse<User> = await API.delete<User>(
			"/user/profile"
		);
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.statusText,
			};
		}
	}

	/**
	 * Update current user profile in backend.
	 */
	static async updateCurrentUser(props: {
		name?: string;
		profilePicture?: string;
		tags?: string[];
	}) {
		// If any picture is selected, upload to S3
		if (props.profilePicture && !props.profilePicture.startsWith("https")) {
			props.profilePicture = await ImageService.upload(
				props.profilePicture
			);
		}

		const response: AxiosResponse = await API.put("/user/profile", props);

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}

	/**
	 * Disable all notfications for current user
	 */
	static async setGlobalNotificationsEnabled(state: boolean) {
		const response: AxiosResponse = await API.post("/user/settings", {
			settings: {
				notifications: {
					enabled: state,
				},
			},
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}

		return response.data;
	}

	/**
	 * Disable all notfications for current user
	 */
	static async setClubNotificationsEnabled(clubId: string, state: boolean) {
		const response: AxiosResponse = await API.put("/user/settings", {
			settings: {
				notifications: {
					clubs: [
						{
							enabled: state,
							id: clubId,
						},
					],
				},
			},
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}

		return response.data;
	}

	/**
	 * Get another user by profile
	 */
	static async getOtherUser(userId: string) {
		const response: AxiosResponse<User> = await API.get<User>(
			"/user/other/profile",
			{
				params: { id: userId },
			}
		);

		if (response.status !== 200) {
			throw {
				code: response.status,
			};
		}

		return response.data;
	}
}
