import React, { useContext } from "react";
import {
	RefreshControl,
	RefreshControlProps,
	StyleProp,
	ViewStyle,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export interface CoolRefreshControlProps extends RefreshControlProps {
	style?: StyleProp<ViewStyle>;
}

const CoolRefreshControl = (
	props: CoolRefreshControlProps
): React.ReactElement => {
	const { style, ...stuff } = props;
	const theme = useContext(ThemeContext);
	return (
		<RefreshControl
			style={[{ backgroundColor: "transparent" }, style]}
			colors={theme.theme === "light" ? [] : ["white"]}
			tintColor={theme.theme === "light" ? undefined : "white"}
			{...stuff}
		/>
	);
};

export default CoolRefreshControl;
