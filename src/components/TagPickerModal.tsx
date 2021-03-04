import React, { useState, useEffect } from "react";
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
import TagPicker from "./TagPicker";

interface TagSettings {
	visible: boolean;
	functionOnConfirm: StrFunc;
	closeFunction: FunctionNull;
	content: string[];
	checked: string[];
}

type FunctionNull = () => void;
type StrFunc = (arg0: string[]) => void;

const TagPickerModal = (props: TagSettings) => {
	const [checked, setChecked] = useState(props.checked);
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
	const renderItem = ({ item }: ListRenderItemInfo<string>) => (
		<View style={{ margin: 10 }} key={item}>
			<CheckBox
				onChange={() => checkBox(item)}
				checked={checked.includes(item)}
			>
				{item}
			</CheckBox>
		</View>
	);

	return (
		<Modal
			visible={props.visible}
			backdropStyle={ContainerStyles.modalBackdrop}
			onBackdropPress={() => props.closeFunction()}
		>
			<Card
				header={() => (
					<View style={{ margin: 10 }}>
						<Text category="h6">Edit Tags</Text>
					</View>
				)}
				footer={() => (
					<View style={{ flex: 1, flexDirection: "row" }}>
						<Button
							onPress={() => props.closeFunction()}
							style={{ flex: 1, margin: 10 }}
						>
							Cancel
						</Button>
						<Button
							onPress={() => {
								props.closeFunction();
								props.functionOnConfirm(checked);
							}}
							style={{ flex: 1, margin: 10 }}
						>
							Confirm
						</Button>
					</View>
				)}
				style={{ minWidth: "80%" }}
			>
				<FlatList
					data={props.content}
					renderItem={renderItem}
					style={{ maxHeight: 500 }}
				/>
			</Card>
		</Modal>
	);
};

export default TagPickerModal;
