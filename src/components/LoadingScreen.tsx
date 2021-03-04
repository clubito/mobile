import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";

const LoadingScreen = () => {
	return (
		<Layout style={styles.loadingContainer}>
			<Spinner size="large" />
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
