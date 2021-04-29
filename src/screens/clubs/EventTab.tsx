import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Event } from "../../types";
import { ClubTabsParamList } from "./ClubScreen";
import EventList from "../../components/EventList";
import EmptyView from "../../components/EmptyView";

type ProfileScreenRouteProp = RouteProp<ClubTabsParamList, "EventList">;

type ProfileScreenNavigationProp = StackNavigationProp<
	ClubTabsParamList,
	"EventList"
>;

type Props = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

const EventTab = (props: Props) => {
	const [events, setEvents] = useState<Event[]>(props.route.params.eventList);
	if (events.length > 0) return <EventList events={events} refresh={false} />;
	else
		return (
			<EmptyView
				message={
					"The club has no open events. \nJoin the club to participate instead."
				}
			/>
		);
};

export default EventTab;
