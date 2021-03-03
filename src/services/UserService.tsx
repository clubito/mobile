import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import API, { setUserToken } from "./API";

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
		const response: AxiosResponse = await API.get("/auth/url");

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
		const response: AxiosResponse = await API.get("/login/url", {
			params: { email, password },
		});

		if (response.status !== 200) {
			return false;
		}

		// TODO: figure out token access in response after backend is setup
		AsyncStorage.setItem("user_token", response.data);
		setUserToken(response.data);
		return true;
	}

	/**
	 * Clear local data store (user_token etc).
	 */
	static async logout() {
		console.log("yahaha");
		await AsyncStorage.clear();
	}

	/**
	 * Delete account for user and log out TODO
	 */
	static async deleteAccount() {
		console.log("yohoho");
		await AsyncStorage.clear();
	}

	/**
	 * Get user's profile data from backend and return TODO
	 */
	static async getUserData() {}
}
