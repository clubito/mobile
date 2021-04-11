import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Toggle } from "@ui-kitten/components";
import CoolView from "./CoolView";
import CoolListItem from "./CoolListItem";

interface SectionProps {
	text: string;
	icon?: string;
	enabled: boolean;
	onToggle: (state: boolean) => void;
}

const SettingsToggle = (
	props: SectionProps
): React.ReactElement<SectionProps> => {
	const { text, icon, enabled, onToggle } = props;

	return (
		<CoolView style={styles.container} yip>
			<CoolListItem
				title={text}
				accessoryLeft={(props) =>
					icon ? <Icon name={icon} {...props} /> : <></>
				}
				accessoryRight={() => (
					<Toggle
						checked={enabled}
						onChange={(state: boolean) => {
							onToggle(state);
						}}
					/>
				)}
			/>
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 4,
	},
});

export default SettingsToggle;
