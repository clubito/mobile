import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	TouchableWithoutFeedback,
	ScrollView,
	View,
	ActivityIndicator,
} from "react-native";
import {
	Text,
	Input,
	Button,
	Card,
	Divider,
	Layout,
} from "@ui-kitten/components";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { User } from "../../types";
import UserService from "../../services/UserService";
import GeneralModal from "../../components/GeneralModal";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import TagPicker from "../../components/TagPicker";
import ClubService from "../../services/ClubService";

const ProfileSettingsScreen = () => {
	const [newName, setName] = React.useState("");
	const [curPassword, setCurPassword] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirm, setConfirm] = React.useState("");
	const [secureText, setSecureText] = React.useState(true);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalType, setModalType] = React.useState(0);
	const { logOutSuccess } = React.useContext(AuthContext);
	const [profile, setProfile] = useState<User | null>(null);
	const [checked, setChecked] = useState([] as string[]);
	const [allTags, setAllTags] = useState([] as string[]);
	const [profilePic, setPFP] = useState("");
	const [tagsChanged, setTagsChanged] = useState(false);
	const [pfpChanged, setPFPChanged] = useState(false);
	const [loading, setLoading] = useState(true);

	const pullAllData = () => {
		UserService.getCurrentUser().then((data) => {
			setProfile(data);
			setChecked(data.tags);
			setName(data.name);
			setTagsChanged(false);
			setPFPChanged(false);
		});
		ClubService.getAllTags().then((data) => {
			setAllTags(data);
		});
	};
	useEffect(() => {
		if (profile === null) {
			pullAllData();
			setLoading(false);
		}
	}, [profile]);

	if (profile === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const onTagsChange = (checkedTags: string[]) => {
		if (checkedTags != checked) {
			setChecked(checkedTags);
			setTagsChanged(true);
		}
	};

	const submitChecklist = () => {
		let props = {} as {
			name?: string;
			profilePicture?: string;
			tags?: string[];
		};
		if (newName !== "" && profile && newName !== profile.name)
			props.name = newName;
		if (pfpChanged) props.profilePicture = profilePic;
		if (tagsChanged) props.tags = checked;
		if (props.name || props.profilePicture || props.tags) {
			UserService.updateCurrentUser(props)
				.then(() => {
					pullAllData();
				})
				.catch((error) => console.log(error.message));
		} else {
			console.log("Nothing was changed");
		}
	};

	const submitChangePassword = () => {
		console.log(curPassword);
		console.log(password);
		console.log(confirm);
	};

	const toggleVisibleText = () => {
		setSecureText(!secureText);
	};

	const imageCallback = (image: string) => {
		setPFP(image);
		setPFPChanged(true);
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
				<Card
					footer={() => (
						<Button onPress={submitChecklist}>Submit</Button>
					)}
				>
					<Text category="h4" style={TextStyle.subheader}>
						Change Name
					</Text>
					<Input
						placeholder="Name"
						label="Name"
						value={newName}
						onChangeText={(nameUpdate) => setName(nameUpdate)}
					/>
					<View style={{ marginTop: 10 }}>
						<Text category="h6" style={ContainerStyles.lowerMargin}>
							Tags
						</Text>
						<Text appearance="hint">{profile.tags.join(", ")}</Text>
					</View>

					<Divider style={TextStyle.divider} />

					<TagPicker
						functionOnConfirm={onTagsChange}
						content={allTags}
						checked={profile.tags}
						style={{ maxHeight: 200 }}
					/>
					<Text category="h4" style={TextStyle.subheader}>
						Update Profile Picture
					</Text>
					<ProfilePicturePicker
						functionOnConfirm={(image) => imageCallback(image)}
						pfp={profile.profilePicture}
					/>
				</Card>
				<Card
					footer={() => (
						<Button onPress={submitChangePassword}>Submit</Button>
					)}
				>
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
									UserService.deleteUser().then(
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
