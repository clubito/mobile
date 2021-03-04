import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { TextStyle, ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Divider, Button } from "@ui-kitten/components";
import UserService from "../../services/UserService";
import { Profile } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	useEffect(() => {
		UserService.getUserProfile().then((data) => {
			setProfile(data);
		});
	});
	if (profile === null) {
		return (
			<View style={TextStyle.center}>
				<Text>An error has occurred, no user data could be found</Text>
			</View>
		);
	}
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
							<b>Name:</b> {profile.name}
						</Text>
						<Text>
							<b>Email:</b> {profile.email}
						</Text>
					</View>
				</View>
				<Divider style={TextStyle.divider} />
				<Text category="h6" style={TextStyle.subheader}>
					Tags
				</Text>
				<ScrollView horizontal={true} style={{ flexDirection: "row" }}>
					{profile.tags.map((tag) => {
						return (
							<Card
								key={tag}
								style={{
									marginHorizontal: 2,
									flexDirection: "row",
								}}
							>
								<Text>{tag}</Text>
							</Card>
						);
					})}
				</ScrollView>
				<Divider style={TextStyle.divider} />
			</View>
			<ScrollView style={ContainerStyles.horizMargin}></ScrollView>
		</SafeAreaView>
	);
};
export default ProfileScreen;
