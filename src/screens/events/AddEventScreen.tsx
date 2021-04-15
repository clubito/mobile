import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { ContainerStyles, TextStyle } from "../../styles/CommonStyles";
import { Text, Button, CheckBox } from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";
import { Formik } from "formik";
import {
	CreateEventModel,
	CreateEventSchema,
} from "../../data/CreateEventData";
import FormInput from "../../components/FormInput";
import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import EventService from "../../services/EventService";
import { EventParamList } from "./EventNavigator";
import DateTimePickerForm from "../../components/DateTimePickerForm";
import GeneralModal from "../../components/GeneralModal";
import { getReadableDate } from "../../utils";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";

type AddEventRouteProp = RouteProp<EventParamList, "AddEvent">;
type AddEventNavigationProp = StackNavigationProp<EventParamList, "AddEvent">;

type Props = {
	route: AddEventRouteProp;
	navigation: AddEventNavigationProp;
};
interface CreateList {
	name: string;
	startTime: Date;
	endTime: Date;
	clubId: string;
	description?: string;
	longitude?: number;
	latitude?: number;
	shortLocation?: string;
	picture?: string;
}
interface EditList {
	name: string;
	startTime: Date;
	endTime: Date;
	eventId: string;
	description?: string;
	longitude?: number;
	latitude?: number;
	shortLocation?: string;
	picture?: string;
	notifyUsers: boolean;
}

type ParamList = CreateList | EditList;

const AddEventScreen = (props: Props) => {
	const [clubInfo, setClubInfo] = useState<Club | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const navigation = useNavigation();
	const [profilePic, setPFP] = useState("");
	const [responseError, setResponseError] = React.useState();
	const savedModel = React.useRef(CreateEventModel.empty());
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [params, setParams] = useState({} as ParamList);
	const [checked, setChecked] = React.useState(false);

	useEffect(() => {
		if (clubInfo === null) {
			ClubService.getClub(props.route.params.clubId).then((data) => {
				setClubInfo(data);
				setLoading(false);
				if (props.route.params.eventId) {
					setLoading(true);
					EventService.getEvent(props.route.params.eventId).then(
						(eventInfo) => {
							var params = {
								name: eventInfo.name,
								startTime: new Date(eventInfo.startTime),
								endTime: new Date(eventInfo.endTime),
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
							if (eventInfo.description)
								params.description = eventInfo.description;
							if (eventInfo.longitude)
								params.longitude = eventInfo.longitude;
							if (eventInfo.latitude)
								params.latitude = eventInfo.latitude;
							if (eventInfo.shortLocation)
								params.shortLocation = eventInfo.shortLocation;
							if (eventInfo.picture && eventInfo.picture != "") {
								setPFP(eventInfo.picture);
								params.picture = eventInfo.picture;
							}
							savedModel.current = new CreateEventModel(
								eventInfo.name,
								eventInfo.description
									? eventInfo.description
									: "",
								eventInfo.startTime
									? new Date(eventInfo.startTime)
									: new Date(),
								eventInfo.endTime
									? new Date(eventInfo.endTime)
									: new Date(),
								eventInfo.longitude ? eventInfo.longitude : 0,
								eventInfo.latitude ? eventInfo.latitude : 0,
								eventInfo.shortLocation
									? eventInfo.shortLocation
									: "",
								eventInfo.picture
									? eventInfo.picture
									: "https://picsum.photos/200"
							);
							setStartDate(savedModel.current.startTime);
							setEndDate(savedModel.current.endTime);
							setLoading(false);
						}
					);
				}
			});
		}
	}, []);

	const triggerModal = (model: CreateEventModel) => {
		savedModel.current = model;
		// setLoading(true);
		var params = {
			name: model.name,
			startTime: new Date(startDate),
			endTime: new Date(endDate),
		} as ParamList;
		if (model.description) params.description = model.description;
		if (model.longitude) params.longitude = model.longitude;
		if (model.latitude) params.latitude = model.latitude;
		if (model.shortLocation) params.shortLocation = model.shortLocation;
		if (profilePic && savedModel.current.picture !== profilePic)
			params.picture = profilePic;
		if (props.route.params.eventId) {
			(params as EditList).eventId = props.route.params.eventId;
			(params as EditList).notifyUsers = checked;
		} else {
			(params as CreateList).clubId = clubInfo ? clubInfo.id : "";
		}
		setParams(params);
		setVisible(true);
	};

	const submitDetails = (params: ParamList) => {
		if (props.route.params.eventId) {
			//Edit event if eventID already exists
			EventService.editEvent(params as EditList)
				.then((data) => {
					setVisible(false);
					if (toast)
						toast.show(data.message, {
							type: "success",
						});
					navigation.goBack();
				})
				.catch((error) => {
					if (toast)
						toast.show(error.message, {
							type: "danger",
						});
					setLoading(false);
				});
		} else {
			//Create event if no eventID
			EventService.createEvent(params as CreateList)
				.then((data) => {
					setVisible(false);
					if (toast)
						toast.show(data.message, {
							type: "success",
						});
					navigation.goBack();
				})
				.catch((error) => {
					if (toast)
						toast.show(error.message, {
							type: "danger",
						});
					setLoading(false);
				});
		}
	};

	if (clubInfo === null || loading) {
		return <LoadingScreen />;
	}

	const onChangeStart = (event: EventService, selectedDate?: Date) => {
		const currentDate = selectedDate || startDate;
		setStartDate(currentDate);
	};

	const onChangeEnd = (event: EventService, selectedDate?: Date) => {
		const currentDate = selectedDate || endDate;
		setEndDate(currentDate);
	};

	return (
		<SafeAreaView
			style={[ContainerStyles.flexContainer, ContainerStyles.horizMargin]}
		>
			<ScrollView>
				<Formik
					style={styles.formContainer}
					initialValues={savedModel.current}
					validationSchema={CreateEventSchema}
					onSubmit={triggerModal}
					validateOnChange={submitted}
				>
					{({ handleSubmit }) => (
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
							<FormInput
								id="shortLocation"
								label="Location"
								style={styles.input}
							/>
							<DateTimePickerForm
								date={startDate}
								onChange={onChangeStart}
								style={styles.input}
								label="Start Date"
							/>
							<DateTimePickerForm
								date={endDate}
								onChange={onChangeEnd}
								style={styles.input}
								label="End Date"
							/>
							<ProfilePicturePicker
								functionOnConfirm={(image) => setPFP(image)}
								pfp={profilePic}
								style={{ marginBottom: 20 }}
								isSquare={true}
							/>
							{props.route.params.eventId ? (
								<CheckBox
									checked={checked}
									onChange={(nextChecked) =>
										setChecked(nextChecked)
									}
									style={ContainerStyles.lowerMargin}
								>
									{`Notify Users of this update: ${checked}`}
								</CheckBox>
							) : null}
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
				header={
					"Would you like to " +
					(props.route.params.eventId ? "edit" : "create") +
					" an event with these details?"
				}
				functionOnConfirm={() => submitDetails(params)}
				closeFunction={() => setVisible(false)}
				content={
					"Name: " +
					(params.name ? params.name : "None") +
					"\nDescription: " +
					(params.description ? params.description : "None") +
					"\nStart Time: " +
					(params.startTime
						? getReadableDate(params.startTime)
						: "None") +
					"\nEnd Time: " +
					(params.endTime
						? getReadableDate(params.endTime)
						: "None") +
					"\nLocation: " +
					(params.shortLocation ? params.shortLocation : "None") +
					(props.route.params.eventId
						? "\nNotify Users: " + (params as EditList).notifyUsers
						: "")
				}
			/>
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
