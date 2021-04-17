import { AxiosResponse } from "axios";
import API from "./API";
import { Club, JoinRequest, Role } from "../types";

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

	/*
	 *	Get club information given a clubId
	 */
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

	/*
	 *	Submit a request to join a club
	 */
	static async requestToJoin(clubID: string) {
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

	/*
	 *	Get all join requests for a given club
	 */
	static async getApplicants(clubID: string) {
		const response: AxiosResponse<JoinRequest[]> = await API.get<
			JoinRequest[]
		>("/clubs/requests", {
			params: { id: clubID },
		});
		return response.data;
	}

	/*
	 *	Approve a prospective club member's registration
	 */
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

	/*
	 *	Reject a prospective club member's registration
	 */
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

	/*
	 *	Remove a member from a club
	 *	Requires a club, user, and a reason
	 */
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

	/*
	 *	Get all roles created for a club
	 */
	static async getRole(roleId: string) {
		const response: AxiosResponse<Role> = await API.get<Role>(
			"/clubs/role",
			{
				params: { roleId: roleId },
			}
		);
		return response.data;
	}

	/*
	 *	Get all roles created for a club
	 */
	static async getAllRoles(clubId: string) {
		const response: AxiosResponse<Role[]> = await API.get<Role[]>(
			"/clubs/roles",
			{
				params: { clubId: clubId },
			}
		);
		return response.data;
	}

	/*
	 *	Create role in a club with given permissions
	 */
	static async createRole(clubId: string, name: string, perms: string[]) {
		const response: AxiosResponse = await API.post("/clubs/roles/create", {
			clubId: clubId,
			roleName: name,
			rolePermissions: perms,
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}

		return response.data;
	}

	/*
	 *	Create role in a club with given permissions
	 */
	static async editRole(roleId: string, name: string, perms: string[]) {
		const response: AxiosResponse = await API.post("/clubs/roles/edit", {
			roleId: roleId,
			roleName: name,
			rolePermissions: perms,
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}

		return response.data;
	}

	/*
	 *	Assign a role to a club member
	 */
	static async assignMemberRole(
		clubId: string,
		userId: string,
		roleId: string
	) {
		const response: AxiosResponse = await API.post("/clubs/roles/assign", {
			clubId: clubId,
			userId: userId,
			roleId: roleId,
		});

		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}

		return response.data;
	}

	/*
	 *	Remove the role assigned to a club member
	 */
	static async removeMemberRole(clubId: string, userId: string) {
		const response: AxiosResponse = await API.post("/clubs/roles/remove", {
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
}
