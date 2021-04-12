import React, { useContext } from "react";
import { Input, InputProps } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

const CoolInput = (props: InputProps): React.ReactElement => {
	const { style, ...stuff } = props;
	const theme = useContext(ThemeContext);

	return (
		<Input
			style={[
				theme.theme === "dark"
					? { backgroundColor: Colors.darkModeBackground }
					: {},
				style,
			]}
			{...stuff}
		/>
	);
};

export default CoolInput;
