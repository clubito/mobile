import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/Colors";

interface Props {
	date: string;
}

const ChatMessageDate = (props: Props) => {
	const { date } = props;
	const theme = useContext(ThemeContext);

	return (
		<View
			style={[
				styles.dateContainer,
				theme.theme === "light" ? styles.lightBg : styles.darkBg,
			]}
		>
			<Text appearance="hint">{dayjs(date).format("MMMM D")}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	dateContainer: {
		borderRadius: 10,
		alignContent: "center",
		alignSelf: "center",
		padding: 5,
		marginTop: 16,
	},
	lightBg: {
		backgroundColor: "#EEEEEE",
	},
	darkBg: {
		backgroundColor: Colors.darkModeBackground,
	},
});

export default ChatMessageDate;
