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
				approvalDate: new Date().toDateString(),
			},
		};
		for (var i = 0; i < 50; i++) {
			const ev1: Event = {
				id: "njklnfd",
				name: "event no. " + i,
				description: "event" + i + " is an event",
				startTime: new Date(
					1616041297644 + i * 100000000
				).toDateString(),
				endTime: new Date(
					1616041297644 + (i + 1) * 100000000
				).toDateString(),
				longitude: 0,
				latitude: 0,
				shortLocation: "Street go here ya number 1",
				picture: "https://picsum.photos/200",
				lastUpdated: new Date().toDateString(),
				clubId: club1.id,
				clubName: club1.name,
			};
			evList.push(ev1);
		}

		return evList;
	}

	static async getEvent(eventID: string) {
		const response: AxiosResponse<Event> = await API.get<Event>(
			"/clubs/event",
			{
				params: { id: eventID },
			}
		);
		if (response.status !== 200) {
			throw {
				code: response.status,
			};
		}
		return response.data;
	}

	static async createEvent(params: {
		name: string;
		startTime: Date;
		endTime: Date;
		clubId: string;
		description?: string;
		longitude?: number;
		latitude?: number;
		shortLocation?: string;
		picture?: string;
	}) {
		const response: AxiosResponse = await API.post(
			"/clubs/event/create",
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

	static async editEvent(params: {
		name: string;
		startTime: Date;
		endTime: Date;
		eventId: string;
		description?: string;
		longitude?: number;
		latitude?: number;
		shortLocation?: string;
		picture?: string;
		notifyUsers: boolean;
	}) {
		const response: AxiosResponse = await API.put(
			"/clubs/event/edit",
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
}
