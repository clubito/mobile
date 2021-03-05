import { AxiosResponse } from "axios";
import API from "./API";
import { Club } from "../types";

export default class ClubService {
	/**
	 * Search for clubs based on given query and optional filter (tags)
	 */
	static async search(
		searchQuery: string,
		sort: string,
		tagFilter: string[]
	) {
		const response: AxiosResponse<Club[]> = await API.get<Club[]>(
			"/clubs/search",
			{
				params: {
					name: searchQuery,
					sortBy: sort,
					filter: tagFilter,
				},
			}
		);

		return response.data;
	}

	/**
	 * Get all club tags (sorted alphabetically)
	 */
	static async getAllTags() {
		const response: AxiosResponse<{ tags: string[] }> = await API.get<{
			tags: string[];
		}>("/clubs/tags");

		return response.data.tags;
	}

	static async getClub(clubID: string) {
		const response: AxiosResponse<Club> = await API.get<Club>(
			"/clubs/profile",
			{
				params: { id: clubID },
			}
		);
		return response.data;
	}

	static async requestToJoin(clubID: string) {
		console.log(clubID);
		const response: AxiosResponse = await API.post("/clubs/join", {
			id: clubID,
		});
		console.log(response);
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}
}
