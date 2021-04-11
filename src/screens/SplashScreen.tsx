import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import CoolView from "../components/CoolView";
import { TextStyle } from "../styles/CommonStyles";
import Colors from "../styles/colors";

const SplashScreen = () => (
	<CoolView style={TextStyle.center} yip>
		<Text category="h5" style={styles.text}>
			C L U B I T O
		</Text>
	</CoolView>
);

const styles = StyleSheet.create({
	text: {
		color: Colors.primary,
		fontWeight: "600",
	},
});

export default SplashScreen;
