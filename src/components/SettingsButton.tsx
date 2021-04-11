import React from "react";
import { StyleSheet } from "react-native";
import { Icon, ListItem } from "@ui-kitten/components";
import CoolView from "./CoolView";

interface SectionProps {
	text: string;
	icon?: string;
	onPress: () => void;
}

const SettingsButton = (
	props: SectionProps
): React.ReactElement<SectionProps> => {
	const { text, icon, onPress } = props;

	return (
		<CoolView style={styles.container} yip>
			<ListItem
				title={text}
				style={styles.item}
				accessoryLeft={(props) => <Icon name={icon} {...props} />}
				onPress={onPress}
			/>
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
	item: {
		backgroundColor: "transparent",
	},
});

export default SettingsButton;
