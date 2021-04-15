import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IndexPath, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { AuthContext } from "../../context/AuthContext";
import UserService from "../../services/UserService";
import {
	ProfileSetupModel,
	ProfileSetupSchema,
} from "../../data/ProfileSetupData";
import KeyboardAwareLayout from "../../components/KeyboardAwareLayout";
import FormInput from "../../components/FormInput";
import FormMultiSelect from "../../components/FormMultiSelect";
import LoadingScreen from "../../components/LoadingScreen";
import ClubService from "../../services/ClubService";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import CoolView from "../../components/CoolView";

const ProfileSetupScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const { profileSetupSuccess } = React.useContext(AuthContext);

	const savedModel = React.useRef(ProfileSetupModel.empty());
	const [tags, setTags] = React.useState([] as string[]);
	const [submitted, setSubmitted] = React.useState(false);
	const [responseError, setResponseError] = React.useState();

	useEffect(() => {
		ClubService.getAllTags().then((tagList) => setTags(tagList));
	}, []);

	const createUser = (model: ProfileSetupModel) => {
		savedModel.current = model;
		setIsLoading(true);

		UserService.setupProfile({
			name: model.name,
			profilePicture: model.profilePicture,
			tags: mapTagSelections(model.tags),
		})
			.then(() => profileSetupSuccess())
			.catch((error) => {
				setResponseError(error.message);
				setIsLoading(false);
			});
	};

	const mapTagSelections = (selectedTags: IndexPath[]) => {
		const list: string[] = [];
		selectedTags.forEach((index) => {
			list.push(tags[index.row]);
		});
		return list;
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<CoolView style={ContainerStyles.flexContainer}>
			<Formik
				initialValues={savedModel.current}
				validationSchema={ProfileSetupSchema}
				onSubmit={createUser}
				validateOnChange={submitted}
			>
				{({ handleSubmit, setFieldValue }) => (
					<KeyboardAwareLayout>
						<View style={ContainerStyles.center}>
							<View style={[styles.pictureRow, styles.input]}>
								<ProfilePicturePicker
									functionOnConfirm={(image) => {
										setFieldValue("profilePicture", image);
									}}
								/>
							</View>

							<FormInput
								id="name"
								label="Name"
								style={styles.input}
							/>

							<FormMultiSelect
								id="tags"
								label="Select Interests"
								style={styles.input}
								data={tags}
							/>

							<Button
								style={styles.input}
								onPress={() => {
									setSubmitted(true);
									handleSubmit();
								}}
							>
								Done
							</Button>

							<Text style={TextStyle.error}>
								{responseError!}
							</Text>
						</View>
					</KeyboardAwareLayout>
				)}
			</Formik>
		</CoolView>
	);
};

const styles = StyleSheet.create({
	input: {
		width: 300,
		marginBottom: 15,
	},
	pictureRow: {
		flexDirection: "row",
	},
	avatar: {
		marginRight: 30,
	},
});

export default ProfileSetupScreen;
