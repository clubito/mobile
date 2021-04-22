import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Modal, Text } from "@ui-kitten/components";
import { ContainerStyles } from "../styles/CommonStyles";
import { Role } from "../types";
import { ArrowRightIcon } from "./Icons";
import CoolCard from "./CoolCard";
import CoolDivider from "./CoolDivider";
import CoolListItem from "./CoolListItem";

type Props = {
	roles: Role[];
	visible: boolean;
	onConfirm: (role: Role) => void;
	onDismiss: () => void;
};

const AssignRoleModal = (props: Props) => {
	return (
		<Modal
			visible={props.visible}
			backdropStyle={ContainerStyles.modalBackdrop}
			onBackdropPress={props.onDismiss}
		>
			<CoolCard
				yip
				header={() => (
					<Text category="s1" style={styles.header}>
						Select Role
					</Text>
				)}
				status="primary"
			>
				<FlatList
					style={styles.roleList}
					data={props.roles}
					keyExtractor={(item) => item.name}
					ItemSeparatorComponent={CoolDivider}
					renderItem={({ item }) => (
						<CoolListItem
							title={item.name}
							style={styles.roleItem}
							description={
								item.permissions.length +
								" " +
								(item.permissions.length === 1
									? "Permission"
									: "Permissions")
							}
							accessoryRight={ArrowRightIcon}
							onPress={() => {
								props.onConfirm(item);
							}}
						/>
					)}
				/>
			</CoolCard>
		</Modal>
	);
};

const styles = StyleSheet.create({
	header: {
		marginHorizontal: 75,
		marginVertical: 10,
	},
	roleList: {
		margin: -16,
	},
	roleItem: {
		marginHorizontal: -8,
	},
});

export default AssignRoleModal;
