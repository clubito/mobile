/**
 * Contains all types for data handling
 */

interface Announcement {
	clubId: string;
	message: string;
}

interface Event {
	id: string;
	name: string;
	description: string;
	startTime: string;
	endTime: string;
	longitude: number;
	latitude: number;
	shortLocation: string;
	picture: string;
	clubId: string;
	clubName: string;
	lastUpdated: string;
	isRsvp: boolean;
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
	messages: [ChatMessage[]];
	role: string;
}

interface ChatMessage {
	authorId: string;
	authorName: string;
	authorPicture: string;
	timestamp: string;
	body: string;
	isSelf: boolean;
	isDate: boolean;
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
