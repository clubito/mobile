/**
 * Contains all types for data handling
 */

interface Club {
	id: string;
	name: string;
	logo: string;
	description: string;
	role: string;
}

interface User {
	objectId: string;
	name: string;
	email: string;
	clubs: Club[];
	joinRequests: string[];
	tags: string[];
}

export { Club, User };
