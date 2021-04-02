import { AxiosResponse } from "axios";
import API from "./API";
import { Club, JoinRequest, User, Announcement } from "../types";

export default class ClubService {
	/**
	 * Search for clubs based on given query and optional filter (tags)
	 */
	static async search(
		searchQuery: string,
		sort: string,
		tagFilter: string[]
	) {
		const response: AxiosResponse<{ result: Club[] }> = await API.get<{
			result: Club[];
		}>("/clubs/search", {
			params: {
				name: searchQuery,
				sortBy: sort,
				filter: tagFilter,
			},
		});

		return response.data.result;
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

	// post an announcement
	static async createAnnouncement(params: {
		clubId: string;
		message: string;
	}) {
		const response: AxiosResponse = await API.post(
			"/clubs/announcement/create",
			params
		);
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}
	
	static async getAllAnnouncements() {
		const anList = [] as Announcement[];
		const club1: Club = {
			id: "6062a496e99e023eb29ee1ee",
			name: "something something",
			logo: "https://picsum.photos/200",
			description: "cdsfehnjisljifs",
			role: "MEMBER",
			theme: "string",
			joinRequestStatus: {
				status: "PENDING",
				approvalDate: new Date().toDateString(),
			},
		};
		for (var i = 0; i < 50; i++) {
			const an1: Announcement = {
				clubId: club1.id;
				message: string;
			};
			anList.push(an1);
		}
		return anList;
	}


	static async requestToJoin(clubID: string) {
		console.log(clubID);
		const response: AxiosResponse = await API.post("/clubs/join", {
			id: clubID,
		});
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}

	static async getApplicants(clubID: string) {
		const response: AxiosResponse<JoinRequest[]> = await API.get<
			JoinRequest[]
		>("/clubs/requests", {
			params: { id: clubID },
		});
		console.log(response.data);
		return response.data;
	}

	static async approveApplication(clubId: string, userId: string) {
		const response: AxiosResponse = await API.post(
			"/clubs/request/approve",
			{
				clubId: clubId,
				userId: userId,
			}
		);
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}

	static async rejectApplication(clubId: string, userId: string) {
		const response: AxiosResponse = await API.post("/clubs/request/deny", {
			clubId: clubId,
			userId: userId,
		});
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}

	//TODO: Change to correct endpoint when it is done
	static async removeMember(clubId: string, userId: string, reason: string) {
		const response: AxiosResponse = await API.post("/clubs/kick", {
			clubId: clubId,
			userId: userId,
			reason: reason,
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
