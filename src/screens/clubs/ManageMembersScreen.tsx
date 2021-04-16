import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ClubParamList } from "./ClubNavigator";
import { Club } from "../../types";
import ClubService from "../../services/ClubService";
import LoadingScreen from "../../components/LoadingScreen";
import MemberList from "../../components/MemberList";

type Route = RouteProp<ClubParamList, "ManageMembers">;
type Props = {
	route: Route;
};

const ManageMembersScreen = (props: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [club, setClub] = useState({} as Club);

	useEffect(() => {
		ClubService.getClub(props.route.params.clubId)
			.then((data) => setClub(data))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return <MemberList members={club.members!} />;
};

export default ManageMembersScreen;
