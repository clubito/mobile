import { AxiosResponse } from "axios";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./API";
import { ChatMessage, ChatThread } from "../types";

export default class ChatService {
	static socket: Socket;
	static subscribers: Map<string, Function> = new Map();

	/**
	 * Open and initialize the socket connection and set receiver.
	 */
	static async go() {
		this.socket = io("https://server.clubito.me", {
			transports: ["websocket"],
		});

		const token = await AsyncStorage.getItem("user_token");
		this.socket.emit("login", { bearerToken: "Bearer " + token });
		this.socket.on("sendMessage", (response: SocketChat) => {
			this.subscribers.get(response.clubId)!(response.chatMessage);
		});
	}

	/**
	 * Send a message through the opened socket connection.
	 * This message is not sent to the current sending user.
	 */
	static async sendMessage(clubId: string, message: string) {
		this.socket.emit("sendMessage", {
			clubId: clubId,
			body: message,
		});
	}

	/**
	 * Fetch a list of all club chat threads for the current user.
	 * Each thread object only contains the last received message.
	 */
	static async getAllChatThreads() {
		const response: AxiosResponse<ChatThread[]> = await API.get<
			ChatThread[]
		>("/clubs/threads");

		return response.data;
	}

	/**
	 * Fetch the chat thread for a particular club populated
	 * with the messages sent to the thread.
	 */
	static async getChatThread(clubId: string) {
		const response: AxiosResponse<ChatThread> = await API.get<ChatThread>(
			"/clubs/messages",
			{
				params: { id: clubId },
			}
		);
		console.log(response.data)

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

interface SocketChat {
	clubId: string;
	chatMessage: ChatMessage;
}
