import { Role } from "../types";

const RolePermissions = {
	ADD_ANNOUNCEMENTS: "ADD_ANNOUNCEMENTS",
	ADD_EDIT_EVENTS: "ADD_EDIT_EVENTS",
	MANAGE_APPLICATIONS: "MANAGE_APPLICATIONS",
	MANAGE_MEMBERS: "MANAGE_MEMBERS",
	MANAGE_ROLES: "MANAGE_ROLES",
};

const getRoleLabel = (roleName: string) => {
	switch (roleName) {
		case RolePermissions.ADD_ANNOUNCEMENTS:
			return "Add Announcements";
		case RolePermissions.ADD_EDIT_EVENTS:
			return "Add/Edit Events";
		case RolePermissions.MANAGE_APPLICATIONS:
			return "Manage Applications";
		case RolePermissions.MANAGE_MEMBERS:
			return "Manage Members";
		case RolePermissions.MANAGE_ROLES:
			return "Manage Roles";
		default:
			return "-";
	}
};

const hasClubSettingsPermission = (role: Role): boolean => {
	let hasPermission = false;
	role.permissions.forEach((perm) => {
		if (perm.startsWith("MANAGE")) hasPermission = true;
	});
	return hasPermission;
};

const hasPermission = (role: Role, perm: string): boolean => {
	return role.permissions.includes(perm);
};

export {
	RolePermissions,
	hasPermission,
	getRoleLabel,
	hasClubSettingsPermission,
};
