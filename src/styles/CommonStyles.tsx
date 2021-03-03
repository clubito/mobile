import { StyleSheet } from "react-native";

const TextStyle = StyleSheet.create({
	center: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
const ContainerStyles = StyleSheet.create({
	// container style to add padding to biggest container so that items do not hit edge of screen
	flexContainer: {
		padding: 10,
		flex: 1,
	},
	// Standardized margin to separate items
	upperMargin: { marginTop: 10 },
	// Standardized margins for separating headers from items
	lowerMargin: { marginBottom: 5 },
	//Overwrite flex and center things
	containerCenter: { alignSelf: "center", marginTop: 10 },
	//Overwrite flex and align start
	containerStart: { alignSelf: "flex-start", marginTop: 10 },
	//Standard darkened backdrop for modal
	modalBackdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },

    // Center container on screen
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
export { TextStyle };
export { ContainerStyles };
