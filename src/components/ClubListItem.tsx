import { Text, Avatar } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { TextStyle } from "../styles/CommonStyles";
import { Club } from "../types";

interface Props {
	club: Club;
}

const ClubListItem = (props: Props) => (
	<View style={{ flexDirection: "row" }}>
		<Avatar
			source={{ uri: props.club.logo }}
			style={{ margin: 5, height: 50, width: 50 }}
		/>
		<View style={{ flexDirection: "column", flex: 1 }}>
			<Text category="h4">{props.club.name}</Text>
			<Text
				appearance="hint"
				style={{ overflow: "hidden" }}
				numberOfLines={1}
			>
				{props.club.description}
			</Text>
		</View>
	</View>
);

export default ClubListItem;
