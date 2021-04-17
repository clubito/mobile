import React from "react";
import { StyleSheet } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ClubParamList } from "../ClubNavigator";
import CoolView from "../../../components/CoolView";
import FloatingButton from "../../../components/FloatingButton";
import { PlusIcon } from "../../../components/Icons";

type Route = RouteProp<ClubParamList, "ManageRoles">;
type Props = {
	route: Route;
};

const ManageRolesScreen = (props: Props) => {
	const navigation = useNavigation();

	return (
		<CoolView style={styles.container}>
			<FloatingButton
				icon={PlusIcon}
				onPress={() =>
					navigation.navigate("AddEditRole", {
						clubId: undefined,
					})
				}
			/>
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ManageRolesScreen;
