import React from "react";
import {
	Button,
	Icon,
	IconProps,
	InputElement,
	InputProps,
	Text,
} from "@ui-kitten/components";
import GeneralModal from "./GeneralModal";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";

import { useFormikContext } from "formik";
import CoolInput from "./CoolInput";
import { StyleSheet } from "react-native";
import CoolView from "./CoolView";

interface FormColorPickerProps extends InputProps {
	id: string;
	initColor: string;
	functionOnConfirm: (arg0: string) => void;
}

const ErrorIcon = (props: IconProps) => (
	<Icon name="alert-triangle-outline" {...props} />
);

const FormColorPicker = ({
	id,
	initColor,
	functionOnConfirm,
	...inputProps
}: FormColorPickerProps): InputElement => {
	const formContext = useFormikContext();

	// @ts-ignore
	const { [id]: value } = formContext.values;

	// @ts-ignore
	const { [id]: error } = formContext.errors;

	const fieldProps: Partial<InputProps> = {
		status: error && "danger",
		captionIcon: error && ErrorIcon,
	};

	const [visible, setVisible] = React.useState(false);
	const [color, setColor] = React.useState(initColor);
	// const [hsv, setHsv] = React.useState(toHsv(initColor));
	const [oldColor, setOldColor] = React.useState(initColor);

	const ColorPickerButton = () => {
		return (
			<Button
				style={{ backgroundColor: color }}
				onPress={() => setVisible(true)}
				accessoryLeft={() => (
					<Icon
						name="color-picker-outline"
						style={{ height: 15, width: 15 }}
					/>
				)}
			/>
		);
	};
	return (
		<>
			<GeneralModal
				header="Color Picker"
				visible={visible}
				onConfirm={() => {
					setVisible(false);
					functionOnConfirm(color);
					setOldColor(color);
				}}
				onDismiss={() => setVisible(false)}
				content={
					<CoolView style={styles.form}>
						{/* <CoolInput
							{...inputProps}
							value={color}
							caption={error}
							onChangeText={setColor}
						/> */}
						<Text category="h3">{color}</Text>
						<Text
							appearance="hint"
							category="c2"
							style={{ textAlign: "center", width: 300 }}
						>
							Tap on the left color to revert to the previous
							color. Tap on the right color to confirm selection.
						</Text>
						<CoolView style={{ width: 300, height: 300 }}>
							<ColorPicker
								// color={hsv}
								oldColor={oldColor}
								// onColorChange={(col) => setHsv(col)}
								onColorSelected={(col) => setColor(col)}
								onOldColorSelected={(col) => setColor(col)}
								style={{ flex: 1 }}
							/>
						</CoolView>
					</CoolView>
				}
			/>
			<CoolInput
				{...inputProps}
				{...fieldProps}
				value={value}
				caption={error}
				onChangeText={formContext.handleChange(id)}
				accessoryRight={() => <ColorPickerButton />}
			/>
		</>
	);
};
const styles = StyleSheet.create({
	form: {
		alignItems: "center",
		justifyContent: "center",
	},
});
export default FormColorPicker;
