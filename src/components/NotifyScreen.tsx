import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Button, Icon, IconProps } from "@ui-kitten/components";
import { View } from "react-native";

interface Props {
	message: string;
}

const NotifyScreen = (props: Props) => {
	const navigation = useNavigation();
	const infiniteAnimationIconRef = React.useRef<IconProps>();
	React.useEffect(() => {
		infiniteAnimationIconRef.current.startAnimation();
	}, []);

	const RenderInfiniteAnimationIcon = (props: IconProps) => (
		<Icon
			{...props}
			ref={infiniteAnimationIconRef}
			animation="zoom"
			name="checkmark-circle-2"
			fill="green"
		/>
	);
	return (
		<View
			style={{
				flex: 1,
				alignSelf: "center",
				justifyContent: "center",
				margin: 10,
				backgroundColor: "#FFFFF",
			}}
		>
			<RenderInfiniteAnimationIcon />
			<Text
				category="h3"
				style={{
					textAlign: "center",
					marginBottom: 30,
				}}
			>
				{props.message}
			</Text>
			<Button onPress={() => navigation.goBack()}>OKAY</Button>
		</View>
	);
};

export default NotifyScreen;
