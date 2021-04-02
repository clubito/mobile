import React from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, List, ListItem, Divider } from "@ui-kitten/components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Announcement } from "../../types";
import { ClubTabsParamList } from "./ClubScreen";
import { getReadableDate } from "../../utils";

type AnnouncementListRouteProp = RouteProp<ClubTabsParamList, "AnnouncementList">;

type AnnouncementListNavigationProp = StackNavigationProp<
	ClubTabsParamList,
	"AnnouncementList"
>;

type Props = {
	route: AnnouncementListRouteProp;
	navigation: AnnouncementListNavigationProp;
};

const AnnouncementList = (props: Props) => {
	return (
		<View style={ContainerStyles.horizMargin}>
			<List
				style={styles.list}
				data={props.route.params.announcementList}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => {
					return (
						<ListItem
							style={styles.container}
							description={() => (
								<View>
									<Text style={styles.row}>
										{item.message}
									</Text>	
									<Text style = {styles.row} appearance="hint" numberOfLines={1}>
										{getReadableDate(item.timestamp)}
									</Text>
								</View>
							)}
						/>
					)
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { 
		margin: 5,
	},
	list: {
		backgroundColor: "white",
		marginLeft: -10,
		marginRight: -10
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
