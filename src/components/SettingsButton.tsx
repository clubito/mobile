import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import CoolView from "./CoolView";
import CoolListItem from "./CoolListItem";
import { ArrowRightIcon } from "./Icons";

interface SectionProps {
	text: string;
	icon?: string;
	hasChildScreen?: boolean;
	onPress: () => void;
}

const SettingsButton = (
	props: SectionProps
): React.ReactElement<SectionProps> => {
	const { text, icon, hasChildScreen, onPress } = props;

	return (
		<CoolView style={styles.container} yip>
			<CoolListItem
				title={text}
				accessoryLeft={(props) =>
					icon ? <Icon name={icon} {...props} /> : <></>
				}
				accessoryRight={(props) =>
					hasChildScreen ? <ArrowRightIcon /> : <></>
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
