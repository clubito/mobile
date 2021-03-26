import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Layout, Button, Icon, List } from "@ui-kitten/components";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Club, Event } from "../../types";
import ClubService from "../../services/ClubService";
import GeneralModal from "../../components/GeneralModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
