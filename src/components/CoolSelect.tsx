import React, { useContext } from "react";
import { Select, SelectProps } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/Colors";

export interface CoolSelectProps extends SelectProps {
	children?: React.ReactNode;
}

const CoolSelect = (props: CoolSelectProps): React.ReactElement => {
	const { children, style, ...stuff } = props;
	const theme = useContext(ThemeContext);

	return (
		<Select style={[style]} {...stuff}>
			{children}
		</Select>
	);
};

export default CoolSelect;
