import React, { useContext } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export interface CoolViewProps extends ViewProps {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	yip?: boolean;
}

const CoolView = (props: CoolViewProps): React.ReactElement => {
	const { children, style, yip } = props;
	const theme = useContext(ThemeContext);

	return (
		<View
			style={[
				theme.theme === "light"
					? { backgroundColor: "white" }
					: yip && { backgroundColor: "#0d1113" },
				style,
			]}
		>
			{children}
		</View>
	);
};

export default CoolView;
