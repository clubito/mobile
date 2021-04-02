import React, { useContext, useEffect, useRef, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	ActivityIndicator,
} from "react-native";
import { Text, Button, Card, Layout, IndexPath } from "@ui-kitten/components";
import { ContainerStyles } from "../../styles/CommonStyles";
import { User } from "../../types";
import UserService from "../../services/UserService";
import GeneralModal from "../../components/GeneralModal";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
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
import { useNavigation } from "@react-navigation/core";
import SettingsItem from "../../components/SettingsItem";

const ProfileSettingsScreen = () => {
	const nav = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(0);
	const { logOutSuccess } = useContext(AuthContext);
	const [profile, setProfile] = useState<User>({} as User);
	const [enableNotifications, setNotificationsEnabled] = useState(true);
	const [allTags, setAllTags] = useState([] as string[]);
	const [isLoading, setIsLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);
	const [submitted1, setSubmitted1] = useState(false);
	const [responseError, setResponseError] = useState();
	const [responseError1, setResponseError1] = useState();
	const savedModel = useRef(ChangeProfileModel.empty());
	const savedPassModel = useRef(ChangePasswordModel.empty());

	const maptoIndexPath = (selectedTags: string[], allTagsL: string[]) => {
		const list: IndexPath[] = [];
		selectedTags.forEach((value) => {
			if (allTagsL.indexOf(value) >= 0) {
				list.push(new IndexPath(allTagsL.indexOf(value)));
			}
		});
		return list;
	};

	const [profilePic, setPFP] = useState("");
	const pullAllData = () => {
		ClubService.getAllTags().then((data) => {
			setAllTags(data);
			UserService.getCurrentUser().then((userProfile) => {
				setProfile(userProfile);
				setNotificationsEnabled(profile?.enableNotifications!);
				savedModel.current = new ChangeProfileModel(
					userProfile.name,
					userProfile.profilePicture,
					maptoIndexPath(userProfile.tags, data)
				);
				setIsLoading(false);
			});
		});
	};

	useEffect(() => {
		pullAllData();
	}, []);

	if (isLoading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const submitChecklist = (model: ChangeProfileModel) => {
		savedModel.current = model;
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
				.then((data) => {
					pullAllData();
					setResponseError(undefined);
					if (toast)
						toast.show(data.message, {
							type: "success",
						});
				})
				.catch((error) => setResponseError(error.message));
		} else {
			if (toast)
				toast.show("Nothing was changed", {
					type: "normal",
				});
		}
	};

	const mapTagSelections = (selectedTags: IndexPath[]) => {
		const list: string[] = [];
		selectedTags.forEach((index) => {
			list.push(allTags[index.row]);
		});
		return list;
	};

	const imageCallback = (image: string) => {
		setPFP(image);
	};

	const submitChangePassword = (model: ChangePasswordModel) => {
		savedPassModel.current = model;
		AuthService.changePassword(model.curPassword, model.password)
			.then((data) => {
				setResponseError1(undefined);
				if (toast)
					toast.show(data.message, {
						type: "success",
					});
			})
			.catch((error) => setResponseError1(error.message));
	};

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<ScrollView style={ContainerStyles.horizMargin}>
				<Formik
					initialValues={savedModel.current}
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
								label="Select Interests"
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

							<Text status="danger">{responseError!}</Text>
						</Card>
					)}
				</Formik>

				<Card style={ContainerStyles.extraMargin}>
					<SettingsItem
						text="Notifications"
						enabled={enableNotifications}
						onToggle={(state) => {
							setNotificationsEnabled(state);
							UserService.setNotificationsEnabled(state);
						}}
					/>
				</Card>

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

							<Text status="danger">{responseError1!}</Text>
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
									AuthService.logout().then(() => {
										nav.navigate("Home");
										if (toast)
											toast.show(
												"Your account has been successfully logged out",
												{
													type: "success",
												}
											);
										logOutSuccess();
									});
							  }
							: () => {
									UserService.deleteUser().then(() => {
										nav.navigate("Home");
										if (toast)
											toast.show(
												"Your account has been successfully deleted",
												{
													type: "success",
												}
											);
										logOutSuccess();
									});
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
