import React from "react";
import { View } from "react-native";
import { Text, Button, Modal } from "@ui-kitten/components";
import { ContainerStyles } from "../styles/CommonStyles";
import CoolCard from "./CoolCard";

interface ModalProps {
	visible: boolean;
	header: string;
	onConfirm: () => void;
	onDismiss: () => void;
	content: string;
	status?: string;
}

const GeneralModal = (props: ModalProps) => (
	<Modal
		visible={props.visible}
		backdropStyle={ContainerStyles.modalBackdrop}
		onBackdropPress={props.onDismiss}
	>
		<CoolCard
			yip
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
						onPress={props.onDismiss}
						style={{ flex: 1, margin: 10 }}
						status="basic"
					>
						Cancel
					</Button>
					<Button
						onPress={props.onConfirm}
						style={{ flex: 1, margin: 10 }}
						status={props.status ? props.status : "primary"}
					>
						Confirm
					</Button>
				</View>
			)}
			status={props.status}
			style={ContainerStyles.extraMargin}
		>
			<Text>{props.content}</Text>
		</CoolCard>
	</Modal>
);

export default GeneralModal;
