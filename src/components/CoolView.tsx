import React, { useContext } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/Colors";

export interface CoolViewProps extends ViewProps {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	yip?: boolean;
	safe?: boolean;
}

const CoolView = (props: CoolViewProps): React.ReactElement => {
	const { children, style, yip } = props;
	const theme = useContext(ThemeContext);

	if (props.safe)
		return (
			<SafeAreaView
				style={[
					theme.theme === "light"
						? { backgroundColor: "white" }
						: yip && { backgroundColor: Colors.darkModeBackground },
					style,
				]}
			>
				{children}
			</SafeAreaView>
		);

	return (
		<View
			style={[
				theme.theme === "light"
					? { backgroundColor: "white" }
					: yip && { backgroundColor: Colors.darkModeBackground },
				style,
			]}
		>
			{children}
		</View>
	);
};

export default CoolView;
