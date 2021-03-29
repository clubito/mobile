import { AxiosResponse } from "axios";
import API from "./API";
import { ChatThread } from "../types";

export default class ChatService {
	static subscribers: Map<string, Function>;

	/**
	 * Fetch a list of all club chat threads for the current user.
	 * Each thread object only contains the last received message.
	 */
	static async getAllChatThreads() {
		const response: AxiosResponse<ChatThread[]> = await API.get<
			ChatThread[]
		>("/chat/thread/all");

		return response.data;
	}

	/**
	 * Fetch the chat thread for a particular club populated
	 * with the messages sent to the thread.
	 */
	static async getChatThread(clubId: string) {
		const response: AxiosResponse<ChatThread> = await API.get<ChatThread>(
			"/chat/thread",
			{
				params: { id: clubId },
			}
		);

		return response.data;
	}

	/**
	 * Add a new subscriber for a particular club's chat
	 * and register a callback function for when new messages
	 * are recieved.
	 */
	static addSubscriber(clubId: string, callback: Function) {
		this.subscribers.set(clubId, callback);
	}

	/**
	 * Remove a subscriber for a particular club.
	 */
	static removeSubscriber(clubId: string) {
		this.subscribers.delete(clubId);
	}
}
