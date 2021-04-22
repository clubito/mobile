import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClubTabsParamList } from "./ClubScreen";
import EmptyView from "../../components/EmptyView";
import CoolView from "../../components/CoolView";
import CoolDivider from "../../components/CoolDivider";
import AnnouncementListItem from "../../components/AnnouncementListItem";

type AnnouncementListRouteProp = RouteProp<
	ClubTabsParamList,
	"AnnouncementList"
>;

type AnnouncementListNavigationProp = StackNavigationProp<
	ClubTabsParamList,
	"AnnouncementList"
>;

type Props = {
	route: AnnouncementListRouteProp;
	navigation: AnnouncementListNavigationProp;
};

const AnnouncementList = (props: Props) => {
	return props.route.params.announcementList.length > 0 ? (
		<CoolView>
			<FlatList
				data={props.route.params.announcementList}
				ItemSeparatorComponent={CoolDivider}
				ListFooterComponent={CoolDivider}
				renderItem={({ item }) => {
					return (
						<AnnouncementListItem
							announcement={item}
							pressable={false}
						/>
					);
				}}
			/>
		</CoolView>
	) : (
		<EmptyView message="Ain't nobody here :|" />
	);
};

const styles = StyleSheet.create({
	announcementContainer: {
		paddingHorizontal: 16,
	},
	icon: {
		flex: 1,
		marginRight: 5,
		height: 12,
		width: 12,
	},
	avatar: {
		height: 50,
		width: 50,
	},
	row: {
		flexDirection: "row",
	},
	infoContainer: {
		marginLeft: 8,
	},
});

export default AnnouncementList;
