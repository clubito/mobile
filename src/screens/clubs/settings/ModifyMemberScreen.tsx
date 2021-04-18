import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import { Role } from "../../../types";
import ClubService from "../../../services/ClubService";
import LoadingScreen from "../../../components/LoadingScreen";
import CoolView from "../../../components/CoolView";

type Route = RouteProp<ClubParamList, "ModifyMember">;
type Props = {
	route: Route;
};

const ModifyMemberScreen = (props: Props) => {
	const user = props.route.params.user;
	const [isLoading, setIsLoading] = useState(true);
	const [roles, setRoles] = useState<Role[]>([]);

	useEffect(() => {
		ClubService.getAllRoles(props.route.params.clubId)
			.then((roles) => setRoles(roles))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return <CoolView></CoolView>;
};

export default ModifyMemberScreen;
