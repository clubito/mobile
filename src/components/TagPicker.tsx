import React, { useEffect, useState } from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import {
	Text,
	Button,
	Modal,
	Card,
	CheckBox,
	List,
	ListItem,
} from "@ui-kitten/components";
import { ContainerStyles } from "../styles/CommonStyles";

interface TagSettings {
	functionOnConfirm: StrFunc;
	closeFunction: FunctionNull;
	content: string[];
	checked: string[];
}

type FunctionNull = () => void;
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
			style={{ maxHeight: 500 }}
		/>
	);
};

export default TagPicker;
