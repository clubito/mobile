import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import API, { setUserToken } from "./API";
import { Profile, Club } from "../types";

export default class UserService {
	/**
	 * Validate the current user's token if it exists.
	 */
	static async isAnyoneLoggedIn() {
		const token = await AsyncStorage.getItem("user_token");

		if (token === null) {
			return false;
		}

		setUserToken(token);
		const response: AxiosResponse = await API.post("/token/verify", {
			token: token,
		});

		// Invalid token
		if (response.status !== 200) {
			this.logout();
			return false;
		}

		return true;
	}

	/**
	 * Validate credentials with the backend. If login was successful,
	 * save the new user token to the local data store.
	 */
	static async login(email: string, password: string) {
		const response: AxiosResponse = await API.post("/login", {
			email: email,
			password: password,
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}

		AsyncStorage.setItem("user_token", response.data.token);
		setUserToken(response.data.token);
	}

	/**
	 * Clear local data store (user_token etc).
	 */
	static async logout() {
		await AsyncStorage.clear();
	}

	/**
	 * Delete account for user and log out TODO
	 */
	static async deleteAccount() {
		await AsyncStorage.clear();
	}

	/**
	 * TODO: Get user's profile data from backend and return
	 */
	static async getUserProfile() {
		// const token = await AsyncStorage.getItem("user_token");

		// if (token === null) {
		// 	return null;
		// }

		// setUserToken(token);
		//TODO: Get data from backend presumably using token
		//Fake data for testing for now
		const club0: Club = {
			objectId: "0000",
			name: "club0name",
			logo: "lsnjkdl",
			description: "this is a clubity yeah",
		};
		const club1: Club = {
			objectId: "0000",
			name: "club1name",
			logo: "lsnjdskdl",
			description: "this is a clubity yeah 1",
		};
		const response: Profile = {
			name: "Bobert Boberty",
			email: "bobert@boberty.bob",
			profile_picture: "string",
			tags: [
				"tag0",
				"tag1",
				"tag2",
				"tag3",
				"tag4",
				"tag5",
				"tag6",
				"tag7",
			],
			clubs: [club0, club1],
		};
		return response;
	}

	/**
	 * Signup new user
	 */
	static async signup(email: string, password: string) {}

	/**
	 * Send password reset request to backend.
	 */
	static async forgotPassword(email: string) {}
}
