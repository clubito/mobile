import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { Text, Layout, Button, CheckBox } from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";
import { ClubParamList } from "./ClubNavigator";
import { Formik } from "formik";
import FormInput from "../../components/FormInput";
import {
	CreateAnnouncementModel,
	CreateAnnouncementSchema,
} from "../../data/CreateAnnouncementData";
import GeneralModal from "../../components/GeneralModal";


type AddAnnouncementRouteProp = RouteProp<ClubParamList, "AddAnnouncement">;
type AddAnnouncementNavigationProp = StackNavigationProp<
	ClubParamList,
	"AddAnnouncement"
>;

type Props = {
	route: AddAnnouncementRouteProp;
	navigation: AddAnnouncementNavigationProp;
};

interface CreateList {
	clubId: string;
	message: string;
}

type ParamList = CreateList;

const AddAnnouncementScreen = (props: Props) => {
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);
	const savedModel = React.useRef(CreateAnnouncementModel.empty());
	const [params, setParams] = useState({} as ParamList);
	const [visible, setVisible] = React.useState(false);
	const [checked, setChecked] = React.useState(false);
	const [responseError, setResponseError] = React.useState();
	const navigation = useNavigation();

	useEffect(() => {
		if (clubInfo === null) {
			ClubService.getClub(props.route.params.clubId).then((data) => {
				setClubInfo(data);
				setLoading(false);
			});
		}
	}, []);

	if (clubInfo === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const triggerModal = (model: CreateAnnouncementModel) => {
		savedModel.current = model;
		var params = {
			clubId: props.route.params.clubId,
			message: model.message
		} as ParamList;
		setVisible(true);
		setParams(params);
	};

	const submitDetails = (params: ParamList) => {
		// Create announcement
		ClubService.createAnnouncement(params as CreateList)
			.then((message) => {
				console.log(message);
				setVisible(false);
				navigation.goBack();
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});	
	}

	if (clubInfo === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<ScrollView>
			<Formik
				style={styles.formContainer}
				initialValues={savedModel.current}
				validationSchema={CreateAnnouncementSchema}
				onSubmit={triggerModal}
				validateOnChange={submitted}
			>
				{({ handleSubmit }) => (
					<Layout style={styles.form}>
						<FormInput
							id="message"
							label="Message"
							multiline={true}
							textStyle={{ minHeight: 100 }}
							style={styles.input}
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
					</Layout>
				)}
			</Formik>
			<GeneralModal
				visible={visible}
				header={
					"Would you like to post this announcement?"
				}
				functionOnConfirm={() => submitDetails(params)}
				closeFunction={() => setVisible(false)}
				content={
					"\nMessage: " + (params.message)
				}
				modalType="basic"
			/>
		</ScrollView>
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
});

export default AddAnnouncementScreen;
