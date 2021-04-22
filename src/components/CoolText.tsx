import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Text, TextProps } from "@ui-kitten/components";

export interface CoolTextProps extends TextProps {
	style?: StyleProp<ViewStyle>;
}

const CoolText = (props: CoolTextProps): React.ReactElement => {
	const { style, ...stuff } = props;

	return (
		<Text style={[{ backgroundColor: "transparent" }, style]} {...stuff} />
	);
};

export default CoolText;
