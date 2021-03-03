import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import {
	Text,
	Input,
	Button,
	Layout,
	Modal,
	Card,
} from "@ui-kitten/components";
import { ContainerStyles } from "../../styles/CommonStyles";
import UserService from "../../services/UserService";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalSettings } from "../../types";

const ProfileScreen = () => {
	const [name, setName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirm, setConfirm] = React.useState("");
	const [secureText, setSecureText] = React.useState(true);
	const [logoutModalVisible, setLogoutVisible] = React.useState(false);

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
	const GeneralModal = (props: ModalSettings) => (
		<Modal
			visible={logoutModalVisible}
			backdropStyle={ContainerStyles.modalBackdrop}
			onBackdropPress={() => setLogoutVisible(false)}
		>
			<Card
				header={() => (
					<View>
						<Text category="h6">{props.header}</Text>
					</View>
				)}
				footer={() => (
					<View>
						<Button onPress={() => setLogoutVisible(false)}>
							Cancel
						</Button>
						<Button onPress={props.functionOnConfirm}>
							Confirm
						</Button>
					</View>
				)}
				status={props.modalType}
			>
				<Text>{props.content}</Text>
			</Card>
		</Modal>
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
					onPress={() => setLogoutVisible(true)}
				>
					Logout
				</Button>
			</Layout>
			<GeneralModal
				header="stringy"
				functionOnConfirm={UserService.logout}
				content="yohoh"
				modalType="basic"
			/>
		</Layout>
	);
};
interface ModalSettings {
	header: string;
	functionOnConfirm: FunctionNull;
	content: string;
	modalType: string;
}

type FunctionNull = () => void;
export default ProfileScreen;
