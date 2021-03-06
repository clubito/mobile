import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClubTabsParamList } from "./ClubScreen";
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
	return <MemberList members={props.route.params.members} />;
};

export default MemberTab;
