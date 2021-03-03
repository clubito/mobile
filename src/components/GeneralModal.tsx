import React from "react";
import { View } from "react-native";
import { Text, Button, Modal, Card } from "@ui-kitten/components";
import { ContainerStyles } from "../styles/CommonStyles";

interface ModalSettings {
	visible: boolean;
	header: string;
	functionOnConfirm: FunctionNull;
	closeFunction: FunctionNull;
	content: string;
	modalType: string;
}

type FunctionNull = () => void;
const GeneralModal = (props: ModalSettings) => (
	<Modal
		visible={props.visible}
		backdropStyle={ContainerStyles.modalBackdrop}
		onBackdropPress={props.closeFunction}
	>
		<Card
			header={() => (
				<View style={{ margin: 10 }}>
					<Text category="h6">{props.header}</Text>
				</View>
			)}
			footer={() => (
				<View
					style={
						(ContainerStyles.flexContainer,
						{ flexDirection: "row" })
					}
				>
					<Button
						onPress={props.closeFunction}
						style={{ flex: 1, margin: 10 }}
					>
						Cancel
					</Button>
					<Button
						onPress={props.functionOnConfirm}
						style={{ flex: 1, margin: 10 }}
						status={props.modalType}
					>
						Confirm
					</Button>
				</View>
			)}
			status={props.modalType}
			style={ContainerStyles.extraMargin}
		>
			<Text>{props.content}</Text>
		</Card>
	</Modal>
);

export default GeneralModal;
