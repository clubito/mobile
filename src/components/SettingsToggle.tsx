import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Icon, Toggle } from "@ui-kitten/components";
import CoolView from "./CoolView";
import CoolListItem from "./CoolListItem";

interface SectionProps {
	text: string;
	icon?: string;
	avatar?: string;
	enabled: boolean;
	onToggle: (state: boolean) => void;
	yip?: boolean;
}

const SettingsToggle = (
	props: SectionProps
): React.ReactElement<SectionProps> => {
	const { text, icon, avatar, enabled, onToggle } = props;

	return (
		<CoolView
			style={styles.container}
			yip={props.yip !== undefined ? props.yip : true}
		>
			<CoolListItem
				title={text}
				accessoryLeft={(props) =>
					icon ? (
						<Icon name={icon} {...props} />
					) : avatar ? (
						<Avatar
							source={{ uri: avatar }}
							style={styles.avatar}
						/>
					) : (
						<></>
					)
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
	avatar: {
		marginLeft: 8,
		marginRight: 5,
		height: 45,
		width: 45,
	},
});

export default SettingsToggle;
