import { AxiosResponse } from "axios";
import API from "./API";
import { Event } from "../types";

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

		for (var i = 0; i < 50; i++) {
			const ev1: Event = {
				name: "event no. " + i,
				description: "event" + i + " is an event",
				startTime: new Date(1616041297644 + i * 100000000),
				endTime: new Date(1616041297644 + (i + 1) * 100000000),
				longitude: "0000001",
				latitude: "123456",
				shortLocation: "Street go here ya number 1",
				picture: "Nothing yet",
				lastUpdated: new Date(),
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
		const ev1: Event = {
			name: "event no. 1",
			description: "event 1 is an event",
			startTime: new Date(1616041297644 + 2 * 100000000),
			endTime: new Date(1616041297644 + (2 + 1) * 100000000),
			longitude: "0000001",
			latitude: "123456",
			shortLocation: "Street go here ya number 1",
			picture: "Nothing yet",
			lastUpdated: new Date(),
		};
		return ev1;
	}
}
