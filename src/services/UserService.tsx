import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import API from "./API";
import ImageService from "./ImageService";
import { Announcement, Club, Event, TimelineItem, User } from "../types";
import EventService from "./EventService";
import ClubService from "./ClubService";

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
					logo: "https://picsum.photos/200/200",
				},
				{
					enabled: false,
					id: "id2",
					name: "LMAO",
					logo: "https://picsum.photos/200/200",
				},
				{
					enabled: true,
					id: "id3",
					name: "ROFL",
					logo: "https://picsum.photos/200/200",
				},
				{
					enabled: false,
					id: "id4",
					name: "YOLO",
					logo: "https://picsum.photos/200/200",
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

	static async getTimeline() {
		var tm = [] as TimelineItem[];
		var fetches = [] as Promise<Club>[];
		await EventService.getAllEvents().then((data) => {
			for (var i of data) tm.push({ item: i, type: "EVENT" });
		});
		await UserService.getCurrentUser().then((data) => {
			for (var i = 0; i < data.clubs.length; i++) {
				fetches.push(ClubService.getClub(data.clubs[i].id));
			}
		});
		await Promise.all(fetches).then((data) => {
			for (var j of data) {
				tm.push({ item: j, type: "CLUB" });
				if (j.announcements)
					for (var i of j.announcements) {
						i.clubId = j.id;
						tm.push({ item: i, type: "ANNOUNCEMENT" });
					}
			}
		});
		tm.sort((a, b) => {
			var d1 = this.getComparator(a);
			var d2 = this.getComparator(b);
			return new Date(d1) < new Date(d2) ? 1 : -1;
		});
		return tm;
	}

	static getComparator(a: TimelineItem) {
		switch (a.type) {
			case "CLUB":
				return (a.item as Club).joinRequestStatus.approvalDate;
			case "EVENT":
				return (a.item as Event).startTime;
			case "ANNOUNCEMENT":
				return (a.item as Announcement).timestamp;
		}
	}
}
