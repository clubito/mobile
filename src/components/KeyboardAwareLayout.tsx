import React from "react";
import { ScrollViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface KeyboardAwareLayoutProps extends ScrollViewProps {
	children?: React.ReactNode;
}

const KeyboardAwareLayout = (
	props: KeyboardAwareLayoutProps
): React.ReactElement => {
	const { children, ...scrollViewProps } = props;

	return (
		<KeyboardAwareScrollView
			{...scrollViewProps}
			alwaysBounceVertical={false}
			alwaysBounceHorizontal={false}
			contentContainerStyle={{ flexGrow: 1 }}
			bounces={false}
			bouncesZoom={false}
		>
			{children}
		</KeyboardAwareScrollView>
	);
};

export default KeyboardAwareLayout;
