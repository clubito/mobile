import React from "react";
import {
	Icon,
	IconProps,
	SelectElement,
	SelectProps,
	Text,
} from "@ui-kitten/components";
import { useFormikContext } from "formik";
import CoolSelect from "./CoolSelect";
import CoolSelectItem from "./CoolSelectItem";

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
		<CoolSelect
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
				return <CoolSelectItem title={item} key={item} />;
			})}
		</CoolSelect>
	);
};

export default FormInput;
