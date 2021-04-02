import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, Layout } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club, JoinRequest, User } from "../../types";
import ClubService from "../../services/ClubService";
import { ClubParamList } from "./ClubNavigator";
import MemberList from "../../components/MemberList";
import ApplicationList from "../../components/ApplicationList";
import Toast from "../../components/Toast";

type ClubSettingsRouteProp = RouteProp<ClubParamList, "ClubSettings">;
type ClubSettingsNavigationProp = StackNavigationProp<
	ClubParamList,
	"ClubSettings"
>;

type Props = {
	route: ClubSettingsRouteProp;
	navigation: ClubSettingsNavigationProp;
};

const ClubSettings = (props: Props) => {
	const [clubInfo, setClubInfo] = useState({} as Club);
	const [applicants, setApplicants] = useState({} as JoinRequest[]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoading1, setIsLoading1] = useState(true);
	const [toastVisible, setToastVisible] = useState(false);
	const [toastText, setToastText] = useState("");
	const [toastSuccess, setToastSuccess] = useState(true);

	useEffect(() => {
		refresh();
	}, []);

	const refresh = () => {
		ClubService.getClub(props.route.params.clubId).then((data) => {
			setClubInfo(data);
			setIsLoading(false);
		});
		ClubService.getApplicants(props.route.params.clubId).then((data) => {
			setApplicants(data);
			setIsLoading1(false);
		});
	};

	const submit = (approval: boolean, clubId: string, userId: string) => {
		if (approval) {
			ClubService.approveApplication(clubId, userId).then((data) => {
				refresh();
				setToastVisible(true);
				setToastText("Successfully added user to the club");
				setToastSuccess(true);
				console.log(data);
			});
		} else {
			ClubService.rejectApplication(clubId, userId).then((data) => {
				refresh();
				setToastVisible(true);
				setToastText("Removed the user's join request");
				setToastSuccess(false);
				console.log(data);
			});
		}
	};

	if (isLoading || isLoading1) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<View style={ContainerStyles.horizMargin}>
				<Text>Club settings for {clubInfo.name}</Text>
				{applicants.length > 0 ? (
					<ApplicationList
						applicants={applicants}
						role={clubInfo.role}
						clubId={clubInfo.id}
						clubName={clubInfo.name}
						update={submit}
					/>
				) : (
					<Text>No Applicants available</Text>
				)}
			</View>
			<Toast
				text={toastText}
				visible={toastVisible}
				status={toastSuccess ? "success" : "failure"}
				onDismiss={() => setToastVisible(false)}
			/>
		</SafeAreaView>
	);
};

export default ClubSettings;
