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
	emptyText?: string;
};

const MemberList = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return props.members.length > 0 ? (
		<CoolView>
			<FlatList
				data={props.members}
				ItemSeparatorComponent={CoolDivider}
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
									style={styles.avatar}
								/>
							)}
							accessoryRight={props.accessoryRight ?? undefined}
						/>
					);
				}}
			/>
		</CoolView>
	) : props.emptyText ? (
		<Text style={styles.emptyText}>{props.emptyText}</Text>
	) : (
		<EmptyView message="Ain't nobody here :|" />
	);
};

const styles = StyleSheet.create({
	emptyText: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	memberContainer: {
		paddingHorizontal: 16,
	},
	title: {
		marginLeft: 8,
		fontSize: 14,
	},
	avatar: {
		marginRight: 4,
	},
});

export default MemberList;
