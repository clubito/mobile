import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import CoolView from "./CoolView";

const LoadingScreen = () => {
	return (
		<CoolView style={styles.loadingContainer}>
			<ActivityIndicator size="large" />
		</CoolView>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
});

export default LoadingScreen;
