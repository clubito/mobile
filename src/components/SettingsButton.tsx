import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import CoolView from "./CoolView";
import CoolListItem from "./CoolListItem";

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
			<CoolListItem
				title={text}
				accessoryLeft={(props) =>
					icon ? <Icon name={icon} {...props} /> : <></>
				}
				onPress={onPress}
			/>
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
});

export default SettingsButton;
