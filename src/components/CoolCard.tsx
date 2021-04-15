import React, { useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, CardProps } from "@ui-kitten/components";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/Colors";

export interface CoolCardProps extends CardProps {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	yip?: boolean;
}

const CoolCard = (props: CoolCardProps): React.ReactElement => {
	const { children, style, yip, ...stuff } = props;
	const theme = useContext(ThemeContext);

	return (
		<Card
			style={[
				theme.theme === "light"
					? { backgroundColor: "white" }
					: yip && { backgroundColor: Colors.darkModeBackground },
				style,
			]}
			{...stuff}
		>
			{children}
		</Card>
	);
};

export default CoolCard;
