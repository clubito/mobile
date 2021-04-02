import React, { useState } from "react";
import {
	Icon,
	IconProps,
	Select,
	SelectElement,
	SelectItem,
	SelectProps,
	Text,
} from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import EventService from "../services/EventService";
import { StyleProp, View } from "react-native";

interface Props {
	date: Date;
	onChange: (event: EventService, selectedDate?: Date) => void;
	style?: StyleProp<any>;
	label: string;
}

const FormDateTimePicker = (props: Props) => {
	return (
		<View style={props.style}>
			<Text style={{ alignSelf: "center", marginRight: 10 }}>
				{props.label}
			</Text>
			<View
				style={{
					flexDirection: "row",
					marginHorizontal: 30,
					marginVertical: 10,
				}}
			>
				<DateTimePicker
					testID="datePicker"
					value={props.date}
					mode={"date"}
					display="default"
					onChange={props.onChange}
					style={{ flex: 1 }}
				/>
				<DateTimePicker
					testID="timePicker"
					value={props.date}
					mode={"time"}
					display="default"
					onChange={props.onChange}
					style={{ flex: 1 }}
				/>
			</View>
		</View>
	);
};

export default FormDateTimePicker;
