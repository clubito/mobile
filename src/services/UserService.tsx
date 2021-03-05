import { AxiosResponse } from "axios";
import API from "./API";
import { User } from "../types";

export default class UserService {
	/**
	 * Get current user profile from backend.
	 */
	static async getCurrentUser() {
		const response: AxiosResponse<User> = await API.get<User>(
			"/user/profile"
		);
		return response.data;
	}
}
