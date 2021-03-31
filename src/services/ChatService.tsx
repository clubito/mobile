import { AxiosResponse } from "axios";
import API from "./API";
import { ChatMessage, ChatThread } from "../types";

export default class ChatService {
	static subscribers: Map<string, Function>;

	/**
	 * Fetch a list of all club chat threads for the current user.
	 * Each thread object only contains the last received message.
	 */
	static async getAllChatThreads() {
		// const response: AxiosResponse<ChatThread[]> = await API.get<
		// 	ChatThread[]
		// >("/chat/thread/all");

		// return response.data;

		// Dummy data until backend is working
		const chatList: ChatThread[] = [];
		const getChats = (): ChatMessage[] => {
			var messageList: ChatMessage[] = [];
			for (let i = 0; i < 6; i++) {
				messageList.push(
					i % 2 == 0
						? {
								authorId: "6063e482a01eb4001e953dd7",
								authorName: "samDman",
								authorPicture: "https://picsum.photos/200",
								timestamp: new Date(),
								body: "message " + i.toString(),
						  }
						: {
								authorId: "6062a496e99e023eb29ee1eb",
								authorName: "John Somethings",
								authorPicture: "https://picsum.photos/200",
								timestamp: new Date(),
								body: "message " + i.toString(),
						  }
				);
			}
			return messageList;
		};

		for (let i = 0; i < 3; i++) {
			chatList.push({
				clubId: i.toString(),
				clubName: "443h bois",
				clubLogo: "https://picsum.photos/200",
				messages: getChats(),
				role: "MEMBER",
			});
		}

		return chatList;
	}

	/**
	 * Fetch the chat thread for a particular club populated
	 * with the messages sent to the thread.
	 */
	static async getChatThread(clubId: string) {
		// 	const response: AxiosResponse<ChatThread> = await API.get<ChatThread>(
		// 		"/chat/thread",
		// 		{
		// 			params: { id: clubId },
		// 		}
		// 	);

		// 	return response.data;

		// Dummy data until backend is working
		const chatThread = await this.getAllChatThreads();
		return chatThread[0];
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
