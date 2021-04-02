/**
 * Contains all types for data handling
 */

//Utility function to render a string or Date object into a human readable string
type datestring = Date | string;

const getReadableDate = (d: datestring, year?: "2-digit" | "numeric") => {
	if (typeof d === "string") {
		d = new Date(d);
	}
	return (
		String(
			d.toLocaleDateString([], {
				month: "2-digit",
				day: "2-digit",
				year: year ? year : undefined,
			})
		) +
		" " +
		String(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
	);
};
const sameDay = (d1: datestring, d2: datestring) => {
	const date1 = new Date(d1);
	const date2 = new Date(d2);
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

const isCurrent = (start: datestring, end: datestring) => {
	const curDate = new Date();
	const startDate = new Date(start);
	const endDate = new Date(end);
	return curDate > startDate && curDate < endDate;
};

const isUpcoming = (d: datestring) => {
	const curDate = new Date();
	const d1 = new Date(d);
	return d1 > curDate;
};
export { getReadableDate, sameDay, isCurrent, isUpcoming };
