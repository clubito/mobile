import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Event } from "../../types";
import { ClubTabsParamList } from "./ClubScreen";
import EventList from "../../components/EventList";
import MemberList from "../../components/MemberList";

type ProfileScreenRouteProp = RouteProp<ClubTabsParamList, "Members">;

type ProfileScreenNavigationProp = StackNavigationProp<
	ClubTabsParamList,
	"Members"
>;

type Props = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

const MemberTab = (props: Props) => {
	return (
		<MemberList
			members={props.route.params.members}
			role={props.route.params.role}
		/>
	);
};

export default MemberTab;
