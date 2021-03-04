/**
 * Contains all types for data handling
 */

interface Club {
	objectId: string;
	name: string;
	logo: string;
	description: string;
}

interface Profile {
	name: string;
	email: string;
	profile_picture: string | null;
	tags: string[];
	clubs: Club[];
}

export { Club, Profile };
