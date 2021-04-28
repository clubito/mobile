import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
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
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";
import EventDetails from "../../components/EventDetails";

type AddEventRouteProp = RouteProp<EventParamList, "AddEvent">;
type AddEventNavigationProp = StackNavigationProp<EventParamList, "AddEvent">;

type Props = {
	route: AddEventRouteProp;
	navigation: AddEventNavigationProp;
};

interface ParamList {
	name: string;
	startTime: Date;
	endTime: Date;
	description?: string;
	longitude?: number;
	latitude?: number;
	shortLocation?: string;
	picture?: string;
}
interface CreateList extends ParamList {
	clubId: string;
	openEvent: boolean;
}
interface EditList extends ParamList {
	eventId: string;
	notifyUsers: boolean;
}

type CreateEditList = CreateList | EditList;

const AddEventScreen = (props: Props) => {
	const [clubInfo, setClubInfo] = useState<Club>({} as Club);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const navigation = useNavigation();
	const [profilePic, setPFP] = useState("");
	const [responseError, setResponseError] = React.useState();
	const savedModel = React.useRef(CreateEventModel.empty());
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [param, setParam] = useState({} as CreateEditList);
	const [checked, setChecked] = React.useState(false);

	useEffect(() => {
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
						} as EditList;
						params.description = eventInfo?.description;
						params.longitude = eventInfo?.longitude;
						params.latitude = eventInfo?.latitude;
						params.shortLocation = eventInfo?.shortLocation;
						if (eventInfo.picture && eventInfo.picture != "") {
							setPFP(eventInfo.picture);
							params.picture = eventInfo.picture;
						}
						savedModel.current = new CreateEventModel(
							eventInfo.name,
							eventInfo.description ? eventInfo.description : "",
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
	}, []);

	const instanceofCreate = (object: ParamList): object is CreateList => {
		return "clubId" in object;
	};

	const triggerModal = (model: CreateEventModel) => {
		savedModel.current = model;
		// setLoading(true);
		var params;
		if (props.route.params.eventId) {
			params = {} as EditList;
			params.eventId = props.route.params.eventId;
			params.notifyUsers = checked;
		} else {
			params = {} as CreateList;
			params.clubId = clubInfo ? clubInfo.id : "";
			// params.openEvent = checked;
		}
		params.name = model.name;
		params.startTime = new Date(startDate);
		params.endTime = new Date(endDate);
		params.description = model?.description;
		params.longitude = model?.longitude;
		params.latitude = model?.latitude;
		params.shortLocation = model?.shortLocation;

		if (profilePic && savedModel.current.picture !== profilePic)
			params.picture = profilePic;
		setParam(params);
		setVisible(true);
	};

	const submitDetails = (params: CreateEditList) => {
		if (instanceofCreate(params)) {
			//Create event if no eventID
			EventService.createEvent(params)
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
		} else {
			//Edit event if eventID already exists
			EventService.editEvent(params)
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
							) : (
								<CheckBox
									checked={checked}
									onChange={(nextChecked) =>
										setChecked(nextChecked)
									}
									style={ContainerStyles.lowerMargin}
								>
									{`Create open event: ${checked}`}
								</CheckBox>
							)}
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
				onConfirm={() => submitDetails(param)}
				onDismiss={() => setVisible(false)}
				content={
					<EventDetails
						name={param.name}
						startTime={param.startTime}
						endTime={param.endTime}
						description={param.description}
						shortLocation={param.shortLocation}
						footer={
							instanceofCreate(param)
								? param.openEvent
									? "Event is open to all members and non-members of the club"
									: "Event is only available to club members"
								: param.notifyUsers
								? "Notify club members of this update"
								: "Do not notify club members of this update"
						}
					/>
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
