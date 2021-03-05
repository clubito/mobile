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
	id: string;
	name: string;
	email: string;
	profilePicture: string;
	clubs: Club[];
	joinRequests: string[];
	tags: string[];
}

export { Club, User };
