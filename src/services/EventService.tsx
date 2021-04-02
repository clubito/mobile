import { AxiosResponse } from "axios";
import API from "./API";
import { Club, Event } from "../types";
import ImageService from "./ImageService";

export default class EventService {
	/**
	 * Get all club tags (sorted chronologically)
	 */
	static async getAllEvents() {
		const response: AxiosResponse<Event[]> = await API.get<Event[]>(
			"/user/club/events"
		);
		return response.data;
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
		if (params.picture && !params.picture.startsWith("https")) {
			params.picture = await ImageService.upload(params.picture);
		}
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
		if (params.picture && !params.picture.startsWith("https")) {
			params.picture = await ImageService.upload(params.picture);
		}

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

	static async getAllRSVPs() {
		const response: AxiosResponse<Event[]> = await API.get<Event[]>(
			"/user/club/rsvp"
		);
		if (response.status !== 200) {
			throw {
				code: response.status,
			};
		}
		console.log(response.data);
		return response.data;
	}

	static async eventRSVP(eventId: string) {
		const response: AxiosResponse = await API.post("/clubs/event/rsvp", {
			eventId: eventId,
		});
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}

	static async cancelRSVP(eventId: string) {
		const response: AxiosResponse = await API.delete("/clubs/event/rsvp", {
			data: { eventId: eventId },
		});
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}

	static async getRSVPMembers() {
		const response: AxiosResponse = await API.post("/clubs/event/rsvp");
		if (response.status !== 200) {
			throw {
				code: response.status,
				message: response.data.error,
			};
		}
		return response.data;
	}
}
