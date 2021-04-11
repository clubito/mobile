import React, { useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, CardProps } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

export interface CoolCardProps extends CardProps {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	yip?: boolean;
}

const CoolCard = (props: CoolCardProps): React.ReactElement => {
	const { children, style, yip } = props;
	const theme = useContext(ThemeContext);

	return (
		<Card
			style={[
				theme.theme === "light"
					? { backgroundColor: "white" }
					: yip && { backgroundColor: Colors.darkModeBackground },
				style,
			]}
		>
			{children}
		</Card>
	);
};

export default CoolCard;
