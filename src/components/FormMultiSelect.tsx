import React from "react";
import {
	Icon,
	IconProps,
	Select,
	SelectElement,
	SelectItem,
	SelectProps,
	Text,
} from "@ui-kitten/components";
import { useFormikContext } from "formik";

interface FormSelectProps extends SelectProps {
	id: string;
	data: string[];
}

const ErrorIcon = (props: IconProps) => (
	<Icon name="alert-triangle-outline" {...props} fill="#FF3D71" />
);

const FormInput = ({
	id,
	data,
	...selectProps
}: FormSelectProps): SelectElement => {
	const formContext = useFormikContext();

	// @ts-ignore
	const { [id]: selections } = formContext.values;

	// @ts-ignore
	const { [id]: error } = formContext.errors;

	const fieldProps: Partial<SelectProps> = {
		status: error && "danger",
	};

	return (
		<Select
			{...selectProps}
			{...fieldProps}
			placeholder={selectProps.placeholder ?? selectProps.label}
			multiSelect={true}
			value={() => (
				<Text>{selections && selections.length + " selected"}</Text>
			)}
			selectedIndex={selections}
			onSelect={(indexes) => formContext.setFieldValue(id, indexes)}
			caption={error}
		>
			{data.map((item: string) => {
				return <SelectItem title={item} key={item} />;
			})}
		</Select>
	);
};

export default FormInput;
