import React from "react";
import { Text, View } from "react-native";
import { TextStyle } from "../styles/CommonStyles";
import { Club } from "../types";

interface Props {
	club: Club;
}

const ClubListItem = (props: Props) => (
	<View style={TextStyle.center}>
		<Text>{props.club.name}</Text>
	</View>
);

export default ClubListItem;
