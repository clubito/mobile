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
	 * Signup new user
	 */
	static async signup(email: string, password: string) {
	}

	/**
	 * Send password reset request to backend.
	 */
	static async forgotPassword(email: string) {
    }
}
