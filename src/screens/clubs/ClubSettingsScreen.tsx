import React, { useEffect, useState } from "react";
import { Text } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club, JoinRequest } from "../../types";
import ClubService from "../../services/ClubService";
import { ClubParamList } from "./ClubNavigator";
import ApplicationList from "../../components/ApplicationList";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";

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
	const [isLoading, setIsLoading] = useState(true);
	const [club, setClub] = useState({} as Club);
	const [applicants, setApplicants] = useState({} as JoinRequest[]);

	useEffect(() => {
		load();
	}, []);

	const load = () => {
		Promise.all([
			ClubService.getClub(props.route.params.clubId),
			ClubService.getApplicants(props.route.params.clubId),
		])
			.then((result: [Club, JoinRequest[]]) => {
				setClub(result[0]);
				setApplicants(result[1]);
			})
			.catch((error) =>
				toast?.show(error.message, {
					type: "danger",
				})
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	const submit = (approval: boolean, clubId: string, userId: string) => {
		if (approval) {
			ClubService.approveApplication(clubId, userId)
				.then((data) => {
					load();
					toast?.show(data.message, {
						type: "success",
					});
				})
				.catch((error) =>
					toast?.show(error.message, {
						type: "danger",
					})
				);
		} else {
			ClubService.rejectApplication(clubId, userId)
				.then((data) => {
					load();
					toast?.show(data.message, {
						type: "success",
					});
				})
				.catch((error) =>
					toast?.show(error.message, {
						type: "danger",
					})
				);
		}
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<CoolView yip>
			{applicants.length > 0 ? (
				<ApplicationList
					applicants={applicants}
					clubId={club.id}
					clubName={club.name}
					update={submit}
				/>
			) : (
				<Text>No Applicants available</Text>
			)}
		</CoolView>
	);
};

export default ClubSettings;
