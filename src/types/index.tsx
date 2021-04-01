/**
 * Contains all types for data handling
 */

interface Announcement {
	message: string;
	timestamp: string;
}

interface Event {
	id: string;
	name: string;
	description: string;
	startTime: string;
	endTime: string;
	longitude: string;
	latitude: string;
	shortLocation: string;
	picture: string;
	clubId: string;
	clubName: string;
	lastUpdated: string;
}

interface Club {
	id: string;
	name: string;
	logo: string;
	description: string;
	role: string;
	theme: string;
	members?: User[];
	announcements?: Announcement[];
	events?: Event[];
	joinRequestStatus: {
		status: string;
		approvalDate: string;
	};
}

interface JoinRequest {
	name: string;
	id: string;
	profilePicture: string;
	requestedAt: Date;
	user: User;
	status: string;
}

interface User {
	id: string;
	name: string;
	email: string;
	profilePicture: string;
	clubs: Club[];
	joinRequests: string[];
	tags: string[];
	role?: string;
	enableNotifications?: boolean;
}

interface ChatThread {
	clubId: string;
	clubName: string;
	clubLogo: string;
	messages: ChatMessage[];
}

interface ChatMessage {
	authorId: string;
	authorName: string;
	authorPicture: string;
	timestamp: string;
	body: string;
}

export {
	Club,
	User,
	Announcement,
	Event,
	ChatThread,
	ChatMessage,
	JoinRequest,
};
