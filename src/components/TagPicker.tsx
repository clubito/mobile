import React, { useEffect, useState } from "react";
import { View, FlatList, ListRenderItemInfo, StyleProp } from "react-native";
import { CheckBox, List } from "@ui-kitten/components";

interface TagSettings {
	functionOnConfirm: StrFunc;
	content: string[];
	checked: string[];
	style: StyleProp<any> | null;
}

type StrFunc = (arg0: string[]) => void;

const TagPicker = (props: TagSettings) => {
	useEffect(() => {
		props.functionOnConfirm(checked);
	});
	const [checked, setChecked] = useState(props.checked);
	const renderItem = ({ item }: ListRenderItemInfo<string>) => (
		<View style={{ margin: 10 }}>
			<CheckBox
				onChange={() => checkBox(item)}
				checked={checked.includes(item)}
			>
				{item}
			</CheckBox>
		</View>
	);
	const checkBox = (item: string) => {
		const isChecked = checked.includes(item);
		if (isChecked) {
			setChecked(
				checked.filter((checkbox) => {
					return checkbox !== item;
				})
			);
		} else {
			setChecked(checked.concat(item));
		}
	};
	return (
		<List
			data={props.content}
			renderItem={renderItem}
			style={props.style}
		/>
	);
};

export default TagPicker;
