import React, { useContext } from "react";
import { SelectItem, SelectItemProps } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/Colors";

const CoolSelectItem = (props: SelectItemProps): React.ReactElement => {
	const { style, ...stuff } = props;
	const theme = useContext(ThemeContext);

	return (
		<SelectItem
			style={[
				theme.theme === "dark"
					? { backgroundColor: Colors.darkModeInput }
					: {},
				style,
			]}
			{...stuff}
		/>
	);
};

export default CoolSelectItem;
