import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Text, Input, Button, Layout } from "@ui-kitten/components";
import { ContainerStyles } from "../../styles/CommonStyles";
import UserService from "../../services/UserService";
import { MaterialIcons } from "@expo/vector-icons";
import GeneralModal from "../../components/GeneralModal";

const ProfileScreen = () => {
	const [name, setName] = React.useState("");
	const [curPassword, setCurPassword] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirm, setConfirm] = React.useState("");
	const [secureText, setSecureText] = React.useState(true);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalType, setModalType] = React.useState(0);

	const toggleVisibleText = () => {
		setSecureText(!secureText);
	};

	const visibleIcon = () => (
		<TouchableWithoutFeedback onPress={toggleVisibleText}>
			<MaterialIcons
				name={secureText ? "visibility" : "visibility-off"}
				size={20}
			/>
		</TouchableWithoutFeedback>
	);
	return (
		<Layout style={ContainerStyles.flexContainer}>
			<Text category="h4" style={ContainerStyles.lowerMargin}>
				Change Name
			</Text>
			<Input
				placeholder="Name"
				label="Name"
				value={name}
				onChangeText={(nameUpdate) => setName(nameUpdate)}
			/>
			<Text
				category="h4"
				style={
					(ContainerStyles.upperMargin, ContainerStyles.lowerMargin)
				}
			>
				Change Password
			</Text>
			<Input
				placeholder="Current Password"
				label="Current Password"
				value={curPassword}
				onChangeText={(passUpdate) => setCurPassword(passUpdate)}
				accessoryRight={visibleIcon}
				secureTextEntry={secureText}
			/>
			<Input
				placeholder="Password"
				label="Password"
				value={password}
				onChangeText={(passUpdate) => setPassword(passUpdate)}
				accessoryRight={visibleIcon}
				secureTextEntry={secureText}
			/>
			<Input
				placeholder="Confirm Password"
				label="Confirm Password"
				value={confirm}
				onChangeText={(passUpdate) => setConfirm(passUpdate)}
				accessoryRight={visibleIcon}
				secureTextEntry={secureText}
			/>
			<Button>Submit</Button>
			<Layout style={ContainerStyles.containerStart}>
				<Button
					appearance="ghost"
					onPress={() => {
						setModalType(0);
						setModalVisible(true);
					}}
					status="warning"
				>
					Logout
				</Button>
			</Layout>
			<Layout style={ContainerStyles.containerStart}>
				<Button
					appearance="ghost"
					onPress={() => {
						setModalType(1);
						setModalVisible(true);
					}}
					status="danger"
				>
					Delete Account
				</Button>
			</Layout>
			<GeneralModal
				visible={modalVisible}
				closeFunction={() => setModalVisible(false)}
				header={
					modalType == 0
						? "Are you sure you want to log out?"
						: "Are you sure you want to delete your account?"
				}
				functionOnConfirm={
					modalType == 0
						? UserService.logout
						: UserService.deleteAccount
				}
				content={
					modalType == 0
						? "Are you sure you want to log out? Your user data will be removed from this device."
						: "Are you sure you want to delete your account? This action is irreversible and your user data will be removed from the database."
				}
				modalType={modalType == 0 ? "warning" : "danger"}
			/>
		</Layout>
	);
};

export default ProfileScreen;
