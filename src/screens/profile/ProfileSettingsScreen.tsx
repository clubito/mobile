import React from "react";
import {
	SafeAreaView,
	TouchableWithoutFeedback,
	ScrollView,
	View,
} from "react-native";
import { Text, Input, Button, Card } from "@ui-kitten/components";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { MaterialIcons } from "@expo/vector-icons";
import GeneralModal from "../../components/GeneralModal";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

const ProfileSettingsScreen = () => {
	const [name, setName] = React.useState("");
	const [curPassword, setCurPassword] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirm, setConfirm] = React.useState("");
	const [secureText, setSecureText] = React.useState(true);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalType, setModalType] = React.useState(0);
	const { logOutSuccess } = React.useContext(AuthContext);

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
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<ScrollView style={ContainerStyles.horizMargin}>
				<Card footer={() => <Button>Submit</Button>}>
					<Text category="h4" style={TextStyle.subheader}>
						Change Name
					</Text>
					<Input
						placeholder="Name"
						label="Name"
						value={name}
						onChangeText={(nameUpdate) => setName(nameUpdate)}
					/>
					<Text category="h4" style={TextStyle.subheader}>
						Update Profile Picture
					</Text>
					<ProfilePicturePicker />
				</Card>
				<Card>
					<Text category="h4" style={TextStyle.subheader}>
						Change Password
					</Text>
					<Input
						placeholder="Current Password"
						label="Current Password"
						value={curPassword}
						onChangeText={(passUpdate) =>
							setCurPassword(passUpdate)
						}
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
				</Card>

				<View style={ContainerStyles.containerStart}>
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
				</View>
				<View style={ContainerStyles.containerStart}>
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
				</View>
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
							? () => {
									AuthService.logout().then(logOutSuccess());
							  }
							: () => {
									AuthService.deleteAccount().then(
										logOutSuccess()
									);
							  }
					}
					content={
						modalType == 0
							? "Are you sure you want to log out? Your user data will be removed from this device."
							: "Are you sure you want to delete your account? Your user data will be removed from the database and you will no longer be able to log in. This action is irreversible."
					}
					modalType={modalType == 0 ? "warning" : "danger"}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ProfileSettingsScreen;
