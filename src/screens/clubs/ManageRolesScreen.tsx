import React from "react";
import { RouteProp } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";
import { ClubParamList } from "./ClubNavigator";
import CoolView from "../../components/CoolView";

type Route = RouteProp<ClubParamList, "ManageRoles">;
type Props = {
	route: Route;
};

const ManageRolesScreen = (props: Props) => {
	return (
		<CoolView>
			<Text>Add/Edit Club Role Screen</Text>
		</CoolView>
	);
};

export default ManageRolesScreen;
