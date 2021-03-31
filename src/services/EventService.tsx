import { AxiosResponse } from "axios";
import API from "./API";
import { Club, Event } from "../types";

export default class EventService {
	/**
	 * Get all club tags (sorted chronologically)
	 */
	static async getAllEvents() {
		// const response: AxiosResponse<{ tags: string[] }> = await API.get<{
		// 	tags: string[];
		// }>("/clubs/tags");
		// return response.data.tags;
		const evList = [] as Event[];
		const club1: Club = {
			id: "6062a496e99e023eb29ee1ee",
			name: "something something",
			logo: "https://picsum.photos/200",
			description: "cdsfehnjisljifs",
			role: "MEMBER",
			theme: "string",
			joinRequestStatus: {
				status: "PENDING",
				approvalDate: new Date(),
			},
		};
		for (var i = 0; i < 50; i++) {
			const ev1: Event = {
				id: "njklnfd",
				name: "event no. " + i,
				description: "event" + i + " is an event",
				startTime: new Date(1616041297644 + i * 100000000),
				endTime: new Date(1616041297644 + (i + 1) * 100000000),
				longitude: "0000001",
				latitude: "123456",
				shortLocation: "Street go here ya number 1",
				picture: "https://picsum.photos/200",
				lastUpdated: new Date(),
				club: club1,
			};
			evList.push(ev1);
		}

		return evList;
	}

	static async getEvent(eventID: string) {
		// const response: AxiosResponse<Club> = await API.get<Club>(
		// 	"/clubs/profile",
		// 	{
		// 		params: { id: clubID },
		// 	}
		// );
		// return response.data;
		const club1: Club = {
			id: "6062a496e99e023eb29ee1ee",
			name: "something something",
			logo: "https://picsum.photos/200",
			description: "cdsfehnjisljifs",
			role: "MEMBER",
			theme: "string",
			joinRequestStatus: {
				status: "PENDING",
				approvalDate: new Date(),
			},
		};
		const ev1: Event = {
			id: "njklnfd",
			name: "event no. 1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			startTime: new Date(1616041297644 + 2 * 100000000),
			endTime: new Date(1616041297644 + (2 + 1) * 100000000),
			longitude: "0000001",
			latitude: "123456",
			shortLocation: "Street go here ya number 1",
			picture: "https://picsum.photos/200",
			lastUpdated: new Date(),
			club: club1,
		};
		return ev1;
	}
}
