import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	SafeAreaView,
	View,
	ScrollView,
} from "react-native";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { Text, Layout, Button } from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";
import { ClubParamList } from "./ClubNavigator";
import { Formik } from "formik";
import {
	CreateEventModel,
	CreateEventSchema,
} from "../../data/CreateEventData";
import FormInput from "../../components/FormInput";
import FormSecureInput from "../../components/FormSecureInput";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import EventService from "../../services/EventService";

type AddEventRouteProp = RouteProp<ClubParamList, "AddEvent">;
type AddEventNavigationProp = StackNavigationProp<ClubParamList, "AddEvent">;

type Props = {
	route: AddEventRouteProp;
	navigation: AddEventNavigationProp;
};

const AddEventScreen = (props: Props) => {
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = React.useState(false);
	const navigation = useNavigation();
	const [profilePic, setPFP] = useState("");
	const [responseError, setResponseError] = React.useState();
	const savedModel = React.useRef(CreateEventModel.empty());

	useEffect(() => {
		if (clubInfo === null) {
			ClubService.getClub(props.route.params.clubId).then((data) => {
				setClubInfo(data);
				setLoading(false);
			});
		}
	}, []);

	const submitEvent = (model: CreateEventModel) => {
		savedModel.current = model;
		setLoading(true);

		var params = {
			name: model.name,
			startTime: new Date(model.startTime),
			endTime: new Date(model.endTime),
		} as {
			name: string;
			startTime: Date;
			endTime: Date;
			clubId: string;
			description?: string;
			longitude?: number;
			latitude?: number;
			shortLocation?: string;
			picture?: string;
		};
		if (model.description) params.description = model.description;
		if (model.longitude) params.longitude = model.longitude;
		if (model.latitude) params.latitude = model.latitude;
		if (model.shortLocation) params.shortLocation = model.shortLocation;
		if (profilePic) params.picture = profilePic;
		params.clubId = clubInfo ? clubInfo.id : "";
		console.log(model);
		EventService.createEvent(params)
			.then((message) => {
				console.log(message);
				navigation.goBack();
			})
			.catch((error) => {
				//TODO: Make toasts here
				console.log(error);
				setLoading(false);
			});
	};

	if (clubInfo === null || loading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<SafeAreaView
			style={[ContainerStyles.flexContainer, ContainerStyles.horizMargin]}
		>
			<ScrollView>
				<Formik
					style={styles.formContainer}
					initialValues={savedModel.current}
					validationSchema={CreateEventSchema}
					onSubmit={submitEvent}
					validateOnChange={submitted}
				>
					{({ handleSubmit }) => (
						<Layout style={styles.form}>
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
							<FormInput
								id="startTime"
								label="Start Time"
								style={styles.input}
							/>
							<FormInput
								id="endTime"
								label="End Time"
								style={styles.input}
							/>
							<FormInput
								id="shortLocation"
								label="Location"
								style={styles.input}
							/>
							<ProfilePicturePicker
								functionOnConfirm={(image) => setPFP(image)}
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
			</ScrollView>
		</SafeAreaView>
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
export default AddEventScreen;
