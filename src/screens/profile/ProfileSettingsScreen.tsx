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
	Avatar,
	IndexPath,
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
import { Formik } from "formik";
import FormInput from "../../components/FormInput";
import FormMultiSelect from "../../components/FormMultiSelect";
import {
	ChangeProfileModel,
	ChangeProfileSchema,
} from "../../data/ChangeProfileData";
import {
	ChangePasswordModel,
	ChangePasswordSchema,
} from "../../data/ChangePasswordData";
import FormSecureInput from "../../components/FormSecureInput";

const ProfileSettingsScreen = () => {
	const [modalVisible, setModalVisible] = React.useState(false);
	const [modalType, setModalType] = React.useState(0);
	const { logOutSuccess } = React.useContext(AuthContext);
	const [profile, setProfile] = useState<User | null>(null);
	const [checked, setChecked] = useState([] as string[]);
	const [allTags, setAllTags] = useState([] as string[]);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = React.useState(false);
	const [submitted1, setSubmitted1] = React.useState(false);
	const [responseError, setResponseError] = React.useState();
	const [responseError1, setResponseError1] = React.useState();
	const [success, setSuccess] = React.useState("");
	const [success1, setSuccess1] = React.useState("");
	const savedModel = React.useRef(ChangeProfileModel.empty());
	const savedPassModel = React.useRef(ChangePasswordModel.empty());

	const [tagList, setTagList] = useState([] as IndexPath[]);

	const [pfpChanged, setPFPChanged] = useState(false);
	const [profilePic, setPFP] = useState("");
	const pullAllData = () => {
		UserService.getCurrentUser().then((data) => {
			setProfile(data);
			setChecked(data.tags);
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
	}, []);

	if (profile === null) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const submitChecklist = (model: ChangeProfileModel) => {
		savedModel.current = model;
		console.log(model);
		let props = {} as {
			name?: string;
			profilePicture?: string;
			tags?: string[];
		};
		if (model.name !== "") props.name = model.name;
		if (profilePic !== profile.profilePicture)
			props.profilePicture = profilePic;
		props.tags = mapTagSelections(model.tags);
		if (props.name || props.profilePicture || props.tags) {
			UserService.updateCurrentUser(props)
				.then(() => {
					pullAllData();
					setSuccess("Successfully updated profile");
					setResponseError(undefined);
				})
				.catch((error) => setResponseError(error.message));
		} else {
			console.log("Nothing was changed");
		}
	};

	const mapTagSelections = (selectedTags: IndexPath[]) => {
		const list: string[] = [];
		selectedTags.forEach((index) => {
			list.push(allTags[index.row]);
		});
		return list;
	};

	const maptoIndexPath = (selectedTags: string[]) => {
		const list: IndexPath[] = [];
		selectedTags.forEach((value) => {
			if (allTags.indexOf(value) >= 0) {
				list.push(new IndexPath(allTags.indexOf(value)));
			}
		});
		return list;
	};

	const imageCallback = (image: string) => {
		setPFP(image);
		setPFPChanged(true);
	};

	const submitChangePassword = (model: ChangePasswordModel) => {
		savedPassModel.current = model;
		console.log(savedPassModel);
		AuthService.changePassword(model.curPassword, model.password)
			.then(() => {
				setSuccess1("Successfully changed password");
				setResponseError1(undefined);
			})
			.catch((error) => setResponseError1(error.message));
	};

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<ScrollView style={ContainerStyles.horizMargin}>
				<Formik
					initialValues={{
						name: profile.name,
						profilePicture: profile.profilePicture,
						tags: maptoIndexPath(profile.tags),
					}}
					validationSchema={ChangeProfileSchema}
					onSubmit={submitChecklist}
					validateOnChange={submitted}
					enableReinitialize={true}
				>
					{({ handleSubmit }) => (
						<Card style={ContainerStyles.extraMargin}>
							<ProfilePicturePicker
								functionOnConfirm={(image) =>
									imageCallback(image)
								}
								pfp={profile.profilePicture}
							/>

							<FormInput id="name" label="Name" />

							<FormMultiSelect
								id="tags"
								label="Select Tags"
								data={allTags}
							/>

							<Button
								onPress={() => {
									setSubmitted(true);
									handleSubmit();
								}}
								style={ContainerStyles.upperMargin}
							>
								Apply
							</Button>

							<Text
								status={success !== "" ? "success" : "danger"}
							>
								{success !== "" ? success! : responseError!}
							</Text>
						</Card>
					)}
				</Formik>
				<Formik
					initialValues={savedPassModel.current}
					validationSchema={ChangePasswordSchema}
					onSubmit={submitChangePassword}
					validateOnChange={submitted1}
				>
					{({ handleSubmit }) => (
						<Card style={ContainerStyles.extraMargin}>
							<FormSecureInput
								id="curPassword"
								label="Current Password"
							/>
							<FormSecureInput id="password" label="Password" />

							<FormSecureInput
								id="confirmPassword"
								label="Confirm Password"
							/>

							<Button
								onPress={() => {
									setSubmitted1(true);
									handleSubmit();
								}}
								style={ContainerStyles.upperMargin}
							>
								Change Password
							</Button>

							<Text
								status={success1 !== "" ? "success" : "danger"}
							>
								{success1 !== "" ? success1! : responseError1!}
							</Text>
						</Card>
					)}
				</Formik>
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
