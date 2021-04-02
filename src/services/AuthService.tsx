import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import API, { setUserToken } from "./API";

export default class AuthService {
	/**
	 * Validate the current user's token if it exists.
	 */
	static async isAnyoneLoggedIn() {
		const token = await AsyncStorage.getItem("user_token");

		if (token === null) {
			return [false, false];
		}

		const response: AxiosResponse = await API.post("/token/verify", {
			token: token,
		});

		// Invalid token
		if (response.status !== 200) {
			this.logout();
			return [false, false];
		}

		setUserToken(token);

		const isUserProfileSetup = await AsyncStorage.getItem(
			"is_user_profile_setup"
		);

		return [true, isUserProfileSetup === "true"];
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

		await AsyncStorage.setItem("user_token", response.data.token);
		setUserToken(response.data.token);

		await AsyncStorage.setItem(
			"is_user_profile_setup",
			response.data.isProfileSetup ? "true" : "false"
		);

		return response.data.isProfileSetup;
	}

	/**
	 * Clear local data store (user_token etc).
	 */
	static async logout() {
		await AsyncStorage.clear();
	}

	/**
	 * Signup new user
	 */
	static async signup(email: string, password: string) {
		const response: AxiosResponse = await API.post("/register", {
			email: email,
			password: password,
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
	}

	/**
	 * Send password reset request to backend.
	 */
	static async forgotPassword(email: string) {
		const response: AxiosResponse = await API.post("/forgot", {
			email: email,
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
	}

	/**
	 *  Change password with current and new password
	 */
	static async changePassword(curPassword: string, newPassword: string) {
		const response: AxiosResponse = await API.post("/reset", {
			currentPassword: curPassword,
			newPassword: newPassword,
		});
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}
}
