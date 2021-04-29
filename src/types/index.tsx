/**
 * Contains all types for data handling
 */

interface Announcement {
	clubId: string;
	message: string;
	timestamp: string;
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
	role: Role;
	theme: string;
	members?: User[];
	announcements?: Announcement[];
	events?: Event[];
	joinRequestStatus: {
		status: string;
		approvalDate: string;
	};
}

type TimelineListType = "ANNOUNCEMENT" | "EVENT" | "CLUB";
interface TimelineItem {
	item: Announcement | Event | Club;
	type: TimelineListType;
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
	approvalDate?: string;
	role?: Role;
	settings?: Settings;
}

interface Role {
	id: string;
	name: string;
	permissions: string[];
	preset: boolean;
}

interface Settings {
	notifications: NotificationSettings;
}

interface NotificationSettings {
	enabled: boolean;
	clubs: {
		enabled: boolean;
		id: string;
		name: string;
		logo: string;
	}[];
}

interface ChatThread {
	clubId: string;
	clubName: string;
	clubLogo: string;
	messages: [ChatMessage[]];
	role: Role;
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
	Role,
	Settings,
	NotificationSettings,
	Announcement,
	Event,
	ChatThread,
	ChatMessage,
	JoinRequest,
	TimelineItem,
	TimelineListType,
};
