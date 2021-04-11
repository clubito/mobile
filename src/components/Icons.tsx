import React, { useContext } from "react";
import { Icon, IconProps } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";

const getColor = () => {
	const theme = useContext(ThemeContext);
	return theme.theme === "light" ? "black" : "#EEEEEE";
};

const EditIcon = (props: IconProps) => (
	<Icon
		name="edit-outline"
		{...props}
		style={{
			width: 24,
			height: 24,
			fill: getColor(),
		}}
	/>
);

const SettingsIcon = (props: IconProps) => (
	<Icon
		name="settings-outline"
		{...props}
		style={{
			width: 20,
			height: 20,
			fill: getColor(),
		}}
	/>
);

export { EditIcon, SettingsIcon };
