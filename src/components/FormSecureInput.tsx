import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
	Icon,
	IconProps,
	InputElement,
	InputProps,
} from "@ui-kitten/components";
import FormInput from "./FormInput";

interface FormInputProps extends InputProps {
	id: string;
}

const FormSecureInput = ({
	id,
	...inputProps
}: FormInputProps): InputElement => {
	const [secureText, setSecureText] = React.useState(true);

	const VisibilityIcon = (props: IconProps) => {
		return (
			<TouchableWithoutFeedback
				onPress={() => setSecureText(!secureText)}
			>
				<Icon name={!secureText ? "eye" : "eye-off"} {...props} />
			</TouchableWithoutFeedback>
		);
	};

	return (
		<FormInput
			{...inputProps}
			id={id}
			accessoryRight={VisibilityIcon}
			secureTextEntry={secureText}
		/>
	);
};

export default FormSecureInput;
