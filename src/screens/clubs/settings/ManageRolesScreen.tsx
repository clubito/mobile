import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Role } from "../../../types";
import ClubService from "../../../services/ClubService";
import { ClubParamList } from "../ClubNavigator";
import CoolView from "../../../components/CoolView";
import FloatingButton from "../../../components/FloatingButton";
import CoolDivider from "../../../components/CoolDivider";
import CoolListItem from "../../../components/CoolListItem";
import LoadingScreen from "../../../components/LoadingScreen";
import { ArrowRightIcon, PlusIcon } from "../../../components/Icons";

type Route = RouteProp<ClubParamList, "ManageRoles">;
type Props = {
	route: Route;
};

const ManageRolesScreen = (props: Props) => {
	const clubId = props.route.params.clubId;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [roles, setRoles] = useState<Role[]>([]);

	useEffect(() => load(), []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => load());
		return unsubscribe;
	}, [navigation]);

	const load = () => {
		ClubService.getAllRoles(clubId)
			.then((roles) => {
				setRoles(roles);
			})
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View style={styles.container}>
			<CoolView yip>
				<FlatList
					data={roles}
					keyExtractor={(item) => item.name}
					ItemSeparatorComponent={CoolDivider}
					renderItem={({ item }) => (
						<CoolListItem
							title={item.name}
							description={
								item.permissions.length +
								" " +
								(item.permissions.length === 1
									? "Permission"
									: "Permissions")
							}
							onPress={() => {
								navigation.navigate("AddEditRole", {
									clubId: clubId,
									role: item,
								});
							}}
							accessoryRight={ArrowRightIcon}
						/>
					)}
				/>
			</CoolView>

			<FloatingButton
				icon={PlusIcon}
				onPress={() =>
					navigation.navigate("AddEditRole", {
						clubId: clubId,
						role: undefined,
					})
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ManageRolesScreen;
