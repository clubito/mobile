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
					query: searchQuery,
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
		const response: AxiosResponse<string[]> = await API.get<string[]>(
			"/clubs/tags"
		);

		return response.data;
	}
}
