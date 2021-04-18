import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";
import { ContainerStyles } from "../styles/CommonStyles";
import CoolCard from "./CoolCard";
import CoolInput from "./CoolInput";

type Props = {
	userName: string;
	visible: boolean;
	onConfirm: (reason: string) => void;
	onDismiss: () => void;
};

const RemoveUserModal = (props: Props) => {
	const [removalReason, setRemovalReason] = useState("");
	const [showError, setShowError] = useState(false);

	return (
		<Modal
			visible={props.visible}
			backdropStyle={ContainerStyles.modalBackdrop}
			onBackdropPress={props.onDismiss}
		>
			<CoolCard
				header={() => (
					<View style={ContainerStyles.extraMargin}>
						<Text category="s1">
							{"Are you sure you want to remove " +
								props.userName +
								"?"}
						</Text>
					</View>
				)}
				footer={() => (
					<View style={styles.buttonRow}>
						<Button
							onPress={props.onDismiss}
							style={styles.button}
							status="basic"
						>
							Cancel
						</Button>
						<Button
							onPress={() => {
								removalReason.length > 0
									? props.onConfirm(removalReason)
									: setShowError(true);
							}}
							style={styles.button}
							status={"danger"}
						>
							Confirm
						</Button>
					</View>
				)}
				status={"danger"}
				yip
			>
				<CoolInput
					placeholder="Reason for removal"
					onChangeText={setRemovalReason}
					caption={showError ? "Enter a reason" : ""}
					status={showError ? "danger" : "basic"}
				/>
			</CoolCard>
		</Modal>
	);
};

const styles = StyleSheet.create({
	buttonRow: {
		flex: 1,
		flexDirection: "row",
	},
	button: {
		flex: 1,
		margin: 10,
	},
});

export default RemoveUserModal;
