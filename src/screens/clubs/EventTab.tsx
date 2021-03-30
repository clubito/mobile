import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Event } from "../../types";
import { ClubTabsParamList } from "./ClubScreen";
import EventList from "../../components/EventList";

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
	return <EventList events={events} />;
};

export default EventTab;
