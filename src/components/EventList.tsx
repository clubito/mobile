import React from "react";
import { FlatList } from "react-native";
import { Event } from "../types";
import EmptyView from "./EmptyView";
import CoolView from "./CoolView";
import CoolDivider from "./CoolDivider";
import EventListItem from "./EventListItem";
import CoolRefreshControl from "./CoolRefreshControl";

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
					<CoolRefreshControl
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
