import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Layout, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { AuthContext } from "../../context/AuthContext";
import UserService from "../../services/UserService";
import { ProfileSetupModel, ProfileSetupSchema } from "../../data/ProfileSetupData";
import FormInput from "../../components/FormInput";
import FormMultiSelect from "../../components/FormMultiSelect";
import LoadingScreen from "../../components/LoadingScreen";
import NotifyScreen from "../../components/NotifyScreen";

const ProfileSetupScreen = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccessful, setIsSuccessful] = React.useState(false);

	const { signInSuccess } = React.useContext(AuthContext);

	const savedModel = React.useRef(ProfileSetupModel.empty());
	const [submitted, setSubmitted] = React.useState(false);
	const [responseError, setResponseError] = React.useState();

	const createUser = (model: ProfileSetupModel) => {
		savedModel.current = model;
		setIsLoading(true);
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isSuccessful) {
		return (
			<NotifyScreen
				message="User account successfully created"
				navigateCallback={signInSuccess}
			/>
		);
	}

	return (
		<Layout style={ContainerStyles.flexContainer}>
			<Formik
				initialValues={savedModel.current}
				validationSchema={ProfileSetupSchema}
				onSubmit={createUser}
				validateOnChange={submitted}
			>
				{({ handleSubmit }) => (
					<Layout style={ContainerStyles.center}>
						<Layout style={[styles.pictureRow, styles.input]}>
							<Avatar
								size="giant"
								style={styles.avatar}
								source={require("../../assets/icon.png")}
							/>
							<Button size="tiny" appearance="ghost">
								Select Profile Picture
							</Button>
						</Layout>

						<FormInput
							id="name"
							label="Name"
							style={styles.input}
						/>

						<FormMultiSelect
							id="tags"
							label="Select Tags"
							style={styles.input}
							data={["1", "2", "mizna"]}
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

						<Text style={TextStyle.error}>{responseError!}</Text>
					</Layout>
				)}
			</Formik>
		</Layout>
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
