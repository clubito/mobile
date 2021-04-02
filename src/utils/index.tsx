/**
 * Contains all types for data handling
 */

//Utility function to render a string or Date object into a human readable string
const getReadableDate = (d: Date | string, year?: "2-digit" | "numeric") => {
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

export { getReadableDate };
