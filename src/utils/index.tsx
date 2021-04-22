/**
 * Contains all types for data handling
 */
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
type datestring = Date | string;

const getReadableDate = (d: datestring, year?: boolean) => {
	if (year) return dayjs(d).format("MM/DD/YY HH:mm A");
	return dayjs(d).format("MM/DD HH:mm A");
};

const sameDay = (d1: datestring, d2: datestring) => {
	return dayjs(d1).isSame(d2, "day");
};

const isCurrent = (start: datestring, end: datestring) => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	return dayjs().isBetween(startDate, endDate);
};

const isUpcoming = (d: datestring) => {
	return dayjs(d).isAfter(dayjs());
};

const getRoleLabel = (roleName: string) => {
	switch (roleName) {
		case "ADD_ANNOUNCEMENTS":
			return "Add Announcements";
		case "ADD_EDIT_EVENTS":
			return "Add/Edit Events";
		case "MANAGE_APPLICATIONS":
			return "Manage Applications";
		case "MANAGE_MEMBERS":
			return "Manage Members";
		case "MANAGE_ROLES":
			return "Manage Roles";
		default:
			return "-";
	}
};

export { getReadableDate, sameDay, isCurrent, isUpcoming, getRoleLabel };
