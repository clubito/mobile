import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import { Club } from "../../../types";
import ClubService from "../../../services/ClubService";
import LoadingScreen from "../../../components/LoadingScreen";
import MemberList from "../../../components/MemberList";
import { ArrowRightIcon } from "../../../components/Icons";

type Route = RouteProp<ClubParamList, "ManageMembers">;
type Props = {
	route: Route;
};

const ManageMembersScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [club, setClub] = useState({} as Club);

	useEffect(() => load(), []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => load());
		return unsubscribe;
	}, [navigation]);

	const load = () => {
		ClubService.getClub(clubId)
			.then((data) => setClub(data))
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<MemberList
			members={club.members!}
			accessoryRight={ArrowRightIcon}
			onPress={(user) =>
				navigation.navigate("ModifyMember", {
					clubId: clubId,
					user: user,
				})
			}
		/>
	);
};

export default ManageMembersScreen;
