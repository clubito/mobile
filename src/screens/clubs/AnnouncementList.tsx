import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClubTabsParamList } from "./ClubScreen";
import EmptyView from "../../components/EmptyView";
import { getReadableDate } from "../../utils";
import CoolView from "../../components/CoolView";
import CoolListItem from "../../components/CoolListItem";
import CoolDivider from "../../components/CoolDivider";

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
				keyExtractor={(item) => item.message}
				ItemSeparatorComponent={CoolDivider}
				ListFooterComponent={CoolDivider}
				renderItem={({ item }) => {
					return (
						<CoolListItem
							style={styles.announcementContainer}
							description={() => (
								<View>
									<Text style={styles.row}>
										{item.message}
									</Text>
									<Text
										style={styles.row}
										appearance="hint"
										numberOfLines={1}
									>
										{getReadableDate(item.timestamp)}
									</Text>
								</View>
							)}
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
