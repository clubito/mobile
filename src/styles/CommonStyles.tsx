import { StyleSheet } from "react-native";

const TextStyle = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	//Style for subheaders to be separated from both stuff above and the contents of its section
	subheader: { marginTop: 10, marginBottom: 5 },

	//Style for dividers that are visible on the current grey background
	divider: {
		alignSelf: "stretch",
		backgroundColor: "#cccccc",
		marginTop: 10,
	},
	error: {
		color: "#FF3D71",
	}
});

const ContainerStyles = StyleSheet.create({
	// container style to stretch across screen
	flexContainer: { flex: 1 },

	// Standardized margin to separate vertical items
	upperMargin: { marginTop: 10 },

	// Standardized margins for separating headers from items
	lowerMargin: { marginBottom: 5 },

	//Horizontal margin to prevent items from hitting edge of screen
	horizMargin: { marginHorizontal: 10 },

	//Overwrite flex and center things
	containerCenter: { alignSelf: "center", marginTop: 10 },

	//Overwrite flex and align start
	containerStart: { alignSelf: "flex-start", marginTop: 10 },

	//Darkened backdrop for modal
	modalBackdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },

	//Standard margin all around for separating things
	extraMargin: { margin: 10 },

	// Center container on screen
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export { TextStyle, ContainerStyles };
