import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import API from "./API";
import ImageService from "./ImageService";
import { Announcement, Club, Event, TimelineItem, User } from "../types";

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
		//temporary values for now
		// const response: AxiosResponse<TimelineItem[]> = await API.get<
		// 	TimelineItem[]
		// >("/user/timeline");

		// if (response.status !== 200) {
		// 	throw {
		// 		code: response.status,
		// 	};
		// }

		// return response.data;

		var ev1: Event = {
			id: "606786f163466f001e0eb193",
			name: "event1",
			description: "Lorem ipsum dolor sin something",
			startTime: new Date().toString(),
			endTime: new Date().toString(),
			longitude: 0,
			latitude: 0,
			shortLocation: "there",
			picture: "https://picsum.photos/200",
			clubId: "606776b33a6b40193d1d279d",
			clubName: "club here",
			lastUpdated: new Date().toString(),
			isRsvp: false,
		};
		var ev2: Event = {
			id: "606786f163466f001e0eb193",
			name: "event2",
			description: "Lorem ipsum dolor sin something",
			startTime: new Date().toString(),
			endTime: new Date().toString(),
			longitude: 0,
			latitude: 0,
			shortLocation: "here",
			picture: "https://picsum.photos/200",
			clubId: "606776b33a6b40193d1d279d",
			clubName: "club here",
			lastUpdated: new Date().toString(),
			isRsvp: false,
		};
		var an1: Announcement = {
			clubId: "606776b33a6b40193d1d279d",
			message: "announcement message here 1",
			timestamp: new Date().toString(),
		};
		var an2: Announcement = {
			clubId: "606776b33a6b40193d1d279d",
			message: "announcement message here 2",
			timestamp: new Date().toString(),
		};
		var cl1: Club = {
			id: "606776b33a6b40193d1d279d",
			name: "club1",
			logo: "https://picsum.photos/200",
			description: "lorem ipsum something something",
			role: "MEMBER",
			theme: "",
			joinRequestStatus: {
				status: "APPROVED",
				approvalDate: new Date().toString(),
			},
		};
		var tm: TimelineItem[] = [
			{ item: ev1, type: "EVENT" },
			{ item: an1, type: "ANNOUNCEMENT" },
			{ item: ev2, type: "EVENT" },
			{ item: an2, type: "ANNOUNCEMENT" },
			{ item: cl1, type: "CLUB" },
		];
		return tm;
	}
}
