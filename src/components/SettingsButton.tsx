import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { Icon, ListItem } from "@ui-kitten/components";

interface SectionProps extends TouchableOpacityProps {
	text: string;
	icon?: string;
	onPress: () => void;
}

const SettingsButton = (
	props: SectionProps
): React.ReactElement<TouchableOpacityProps> => {
	const { text, icon, onPress } = props;

	return (
		<View style={styles.container}>
			<ListItem
				title={text}
				accessoryLeft={(props) => (
					<Icon name="bell-outline" {...props} />
				)}
				onPress={onPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
});

export default SettingsButton;
