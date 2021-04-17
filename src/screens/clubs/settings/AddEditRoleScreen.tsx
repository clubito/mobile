import React from "react";
import { RouteProp } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";
import { ClubParamList } from "../ClubNavigator";
import CoolView from "../../../components/CoolView";

type Route = RouteProp<ClubParamList, "AddEditRole">;
type Props = {
	route: Route;
};

const AddEditRoleScreen = (props: Props) => {
	return (
		<CoolView>
			<Text>Add/Edit Club Role Screen</Text>
		</CoolView>
	);
};

export default AddEditRoleScreen;
