import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TouchableHighlight,
} from "react-native";
import { TextStyle, ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Divider, List } from "@ui-kitten/components";
import UserService from "../../services/UserService";
import { User, Club } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";
import ClubListItem from "../../components/ClubListItem";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const nav = useNavigation();
	const [profile, setProfile] = useState<User | null>(null);
	useEffect(() => {
		if (profile === null) {
			UserService.getCurrentUser().then((data) => {
				setProfile(data);
			});
		}
	}, []);
	if (profile === null) {
		return (
			<View style={TextStyle.center}>
				<Text>An error has occurred, no user data could be found</Text>
			</View>
		);
	}
	const tagList =
		profile.tags.length === 0 ? (
			<Text appearance="hint">
				No tags yet. Add tags in your profile settings.
			</Text>
		) : (
			<ScrollView horizontal={true}>
				{profile.tags.map((item) => {
					<Card>{item}</Card>;
				})}
			</ScrollView>
		);
	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			<View style={ContainerStyles.horizMargin}>
				<View style={{ flexDirection: "row" }}>
					<MaterialIcons
						name="account-box"
						size={50}
						style={{ alignSelf: "center", marginRight: 10 }}
					/>
					<View
						style={{
							alignSelf: "center",
							flexDirection: "column",
						}}
					>
						<Text>
							<Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
							{profile.name}
						</Text>
						<Text>
							<Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
							{profile.email}
						</Text>
					</View>
				</View>
				<Divider style={TextStyle.divider} />
				<View style={{ marginTop: 10 }}>
					<Text category="h6" style={ContainerStyles.lowerMargin}>
						Tags
					</Text>
					{tagList}
				</View>
				<Divider style={TextStyle.divider} />
				<List
					data={profile.clubs}
					renderItem={({ item }) => (
						<TouchableHighlight
							onPress={() =>
								nav.navigate("Club", {
									clubId: item.id,
									clubName: item.name,
								})
							}
						>
							<ClubListItem club={item} />
						</TouchableHighlight>
					)}
					style={{ marginVertical: 10 }}
				/>
			</View>
		</SafeAreaView>
	);
};
export default ProfileScreen;
