import React from "react";
import { FlatList, StyleSheet, ViewProps } from "react-native";
import { Avatar, Text } from "@ui-kitten/components";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { User } from "../types";
import EmptyView from "./EmptyView";
import CoolView from "./CoolView";
import CoolListItem from "./CoolListItem";
import CoolDivider from "./CoolDivider";

type Props = {
	members: User[];
	onPress?: (user: User) => void;
	accessoryRight?: RenderProp<ViewProps>;
};

const MemberList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return props.members.length > 0 ? (
		<CoolView>
			<FlatList
				data={props.members}
				ItemSeparatorComponent={CoolDivider}
				ListFooterComponent={CoolDivider}
				renderItem={({ item }) => {
					return (
						<CoolListItem
							style={styles.memberContainer}
							onPress={() =>
								props.onPress
									? props.onPress(item)
									: navigation.push("Profile", {
											userId: item.id,
									  })
							}
							title={() => (
								<Text style={styles.title} category="s1">
									{item.name}
								</Text>
							)}
							description={
								"Member since " +
								dayjs(item.approvalDate).format("MM/DD/YYYY")
							}
							accessoryLeft={() => (
								<Avatar
									source={{ uri: item.profilePicture }}
									size="small"
								/>
							)}
							accessoryRight={props.accessoryRight ?? undefined}
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
	memberContainer: {
		paddingHorizontal: 16,
	},
	title: {
		marginLeft: 8,
		fontSize: 16,
	},
});

export default MemberList;
