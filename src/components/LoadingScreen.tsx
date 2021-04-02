import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { ActivityIndicator } from "react-native";

const LoadingScreen = () => {
	return (
		<Layout style={styles.loadingContainer}>
			<ActivityIndicator size="large" />
		</Layout>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
});

export default LoadingScreen;
