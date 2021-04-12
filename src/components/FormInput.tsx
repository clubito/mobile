import React from "react";
import {
	Icon,
	IconProps,
	InputElement,
	InputProps,
} from "@ui-kitten/components";
import { useFormikContext } from "formik";
import CoolInput from "./CoolInput";

interface FormInputProps extends InputProps {
	id: string;
}

const ErrorIcon = (props: IconProps) => (
	<Icon name="alert-triangle-outline" {...props} />
);

const FormInput = ({ id, ...inputProps }: FormInputProps): InputElement => {
	const formContext = useFormikContext();

	// @ts-ignore
	const { [id]: value } = formContext.values;

	// @ts-ignore
	const { [id]: error } = formContext.errors;

	const fieldProps: Partial<InputProps> = {
		status: error && "danger",
		captionIcon: error && ErrorIcon,
	};

	return (
		<CoolInput
			{...inputProps}
			{...fieldProps}
			placeholder={inputProps.placeholder ?? inputProps.label}
			value={value}
			caption={error}
			onChangeText={formContext.handleChange(id)}
		/>
	);
};

export default FormInput;
