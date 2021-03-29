import React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";
import { Layout, Text, Toggle } from "@ui-kitten/components";

interface SectionProps extends TouchableOpacityProps {
	text: string;
	enabled: boolean;
	onToggle: (state: boolean) => void;
}

const SettingsItem = (
	props: SectionProps
): React.ReactElement<TouchableOpacityProps> => {
	const { text, enabled, onToggle } = props;

	return (
		<Layout>
			<TouchableOpacity activeOpacity={1.0} style={styles.container}>
				<Text category="s2">{text}</Text>
				<Toggle
					checked={enabled}
					onChange={(state: boolean) => {
						onToggle(state);
					}}
				/>
			</TouchableOpacity>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 8,
	},
});

export default SettingsItem;
