/**
 * Contains all types for data handling
 */

interface Announcement {
	message: string;
	timestamp: Date;
}

interface Event {
	name: string;
	description: string;
	startTime: Date;
	endTime: Date;
	longitude: string;
	latitude: string;
	shortLocation: string;
	picture: string;
	lastUpdated: Date;
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

export { Club, User, Announcement, Event };
