/**
 * Contains all types for data handling
 */

//Utility function to render a string or Date object into a human readable string
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

export { getReadableDate, sameDay, isCurrent, isUpcoming };
