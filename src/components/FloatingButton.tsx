import React, { forwardRef } from "react";
import { ImageProps, StyleSheet } from "react-native";
import { Button, ButtonProps } from "@ui-kitten/components";
import { RenderProp } from "@ui-kitten/components/devsupport";

interface FloatingButtonProps extends ButtonProps {
	icon: RenderProp<Partial<ImageProps>>;
}

const FloatingButton = (
	props: FloatingButtonProps,
	ref: any
): React.ReactElement<FloatingButtonProps> => {
	const { icon, ...stuff } = props;

	return (
		<Button
			ref={ref}
			style={styles.button}
			accessoryLeft={icon}
			{...stuff}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		bottom: 10,
		right: 10,
		width: 50,
		height: 50,
		borderRadius: 25,
	},
});

export default forwardRef(FloatingButton);
