import React, { useContext } from "react";
import { ScrollViewProps, StyleProp, View, ViewStyle } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export interface CoolViewProps extends ScrollViewProps {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

const CoolView = (props: CoolViewProps): React.ReactElement => {
	const { children, style } = props;
	const theme = useContext(ThemeContext);

	return (
		<View
			style={[
				theme.theme === "light" ? { backgroundColor: "white" } : {},
				style,
			]}
		>
			{children}
		</View>
	);
};

export default CoolView;
