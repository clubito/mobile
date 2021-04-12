import React, { useContext } from "react";
import { Divider } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

const CoolDivider = (): React.ReactElement => {
	const theme = useContext(ThemeContext);

	return (
		<Divider
			// style={
			// 	theme.theme === "light"
			// 		? { backgroundColor: "#EEEEEE" }
			// 		: { backgroundColor: Colors.darkModeBackground }
			// }
		/>
	);
};

export default CoolDivider;
