import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { Text, Button, IndexPath } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import ClubService from "../../services/ClubService";
import { Formik } from "formik";
import { CreateClubModel, CreateClubSchema } from "../../data/CreateClubData";
import FormInput from "../../components/FormInput";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import GeneralModal from "../../components/GeneralModal";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";
import ClubDetails from "../../components/ClubDetails";
import FormMultiSelect from "../../components/FormMultiSelect";
import FormColorPicker from "../../components/FormColorPicker";
import KeyboardAwareLayout from "../../components/KeyboardAwareLayout";

interface ParamList {
	name: string;
	description: string;
	picture: string;
	tags: string[];
	theme: string;
}

const CreateClubScreen = () => {
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const navigation = useNavigation();
	const [image, setImage] = useState("");
	const [responseError, setResponseError] = React.useState();
	const savedModel = React.useRef(CreateClubModel.empty());
	const [param, setParam] = useState({} as ParamList);
	const [tags, setTags] = React.useState([] as string[]);

	useEffect(() => {
		setLoading(true);
		ClubService.getAllTags().then((tagList) => {
			setTags(tagList);
			setLoading(false);
		});
	}, []);

	const mapTagSelections = (selectedTags: IndexPath[]) => {
		const list: string[] = [];
		selectedTags.forEach((index) => {
			list.push(tags[index.row]);
		});
		return list;
	};

	const triggerModal = (model: CreateClubModel) => {
		savedModel.current = model;
		var params = {} as ParamList;
		params.name = model.name;
		params.description = model.description;
		params.picture = image ? image : model.picture;
		params.tags = mapTagSelections(model.tags);
		params.theme = model.theme;
		setParam(params);

		setVisible(true);
	};

	const submitDetails = (params: ParamList) => {
		ClubService.createClub(params)
			.then((data) => {
				setVisible(false);
				toast?.show(data.message, {
					type: "success",
				});
				navigation.goBack();
			})
			.catch((error) => {
				toast?.show(error.message, {
					type: "danger",
				});
				setLoading(false);
			});
	};

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<KeyboardAwareLayout
			style={[ContainerStyles.flexContainer, ContainerStyles.horizMargin]}
		>
			<ScrollView>
				<Formik
					style={styles.formContainer}
					initialValues={savedModel.current}
					validationSchema={CreateClubSchema}
					onSubmit={triggerModal}
					validateOnChange={submitted}
				>
					{({ handleSubmit, setFieldValue }) => (
						<CoolView style={styles.form}>
							<FormInput
								id="name"
								label="Name"
								style={styles.input}
							/>
							<FormInput
								id="description"
								label="Description"
								multiline={true}
								textStyle={{ minHeight: 100 }}
								style={styles.input}
							/>
							<ProfilePicturePicker
								functionOnConfirm={setImage}
								style={{ marginBottom: 20 }}
								isSquare={true}
							/>
							<FormMultiSelect
								id="tags"
								label="Select Interests"
								style={styles.input}
								data={tags}
							/>
							<FormColorPicker
								id="theme"
								initColor={"#ffffff"}
								label="Select Theme Color"
								style={styles.input}
								functionOnConfirm={(str) =>
									setFieldValue("theme", str)
								}
							/>
							<Button
								style={styles.submitButton}
								onPress={() => {
									setSubmitted(true);
									handleSubmit();
								}}
							>
								Submit
							</Button>

							<Text style={TextStyle.error}>
								{responseError!}
							</Text>
						</CoolView>
					)}
				</Formik>
			</ScrollView>
			<GeneralModal
				visible={visible}
				header={"Submit a request to create a club with these details?"}
				onConfirm={() => submitDetails(param)}
				onDismiss={() => setVisible(false)}
				content={
					<ClubDetails
						name={param.name}
						description={param.description}
						picture={param.picture}
						tags={param.tags}
						theme={param.theme}
					/>
				}
			/>
		</KeyboardAwareLayout>
	);
};

const styles = StyleSheet.create({
	submitButton: {
		width: 300,
	},
	input: {
		width: 300,
		marginTop: 15,
	},
	formContainer: {
		flex: 1,
	},
	form: {
		alignItems: "center",
		justifyContent: "center",
	},
	divider: {
		height: 20,
		backgroundColor: "transparent",
	},
});
export default CreateClubScreen;
