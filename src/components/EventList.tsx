import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Text, Avatar, Icon } from "@ui-kitten/components";
import { Event } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getReadableDate } from "../utils";
import EmptyView from "./EmptyView";
import CoolView from "./CoolView";
import CoolListItem from "./CoolListItem";
import CoolDivider from "./CoolDivider";
import EventListItem from "./EventListItem";

type Props = {
	events: Event[];
	refresh: boolean;
	onRefresh?: () => void;
};

const EventList = (props: Props) => {
	return props.events.length > 0 ? (
		<CoolView>
			<FlatList
				data={props.events}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={CoolDivider}
				ListFooterComponent={CoolDivider}
				refreshControl={
					<RefreshControl
						refreshing={props.refresh}
						onRefresh={props.onRefresh}
					/>
				}
				renderItem={({ item }) => {
					return <EventListItem event={item} />;
				}}
			/>
		</CoolView>
	) : (
		<EmptyView message="Boooooooooring :|" />
	);
};

export default EventList;
