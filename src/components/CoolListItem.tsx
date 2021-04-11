import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ListItem, ListItemProps } from "@ui-kitten/components";

export interface CoolListItemProps extends ListItemProps {
	style?: StyleProp<ViewStyle>;
}

const CoolListItem = (props: CoolListItemProps): React.ReactElement => {
	const { style, ...stuff } = props;

	return (
		<ListItem
			style={[{ backgroundColor: "transparent" }, style]}
			{...stuff}
		/>
	);
};

export default CoolListItem;
