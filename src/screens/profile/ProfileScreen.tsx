import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	ActivityIndicator,
	StyleSheet,
	ImageBackground,
} from "react-native";
import {
	Text,
	Card,
	List,
	Avatar,
	Layout,
	Divider,
} from "@ui-kitten/components";
import UserService from "../../services/UserService";
import { User } from "../../types";
import ClubListItem from "../../components/ClubListItem";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const nav = useNavigation();
	const [profile, setProfile] = useState({} as User);
	const [isLoading, setIsLoading] = useState(true);

	const getUserData = () => {
		UserService.getCurrentUser().then((data) => {
			setProfile(data);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		const unsubscribe = nav.addListener("focus", () => {
			getUserData();
		});
		return unsubscribe;
	}, [nav]);

	if (isLoading) {
		return (
			<Layout style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const tagList =
		profile.tags.length === 0 ? (
			<Text appearance="hint">
				No interests yet. Add interests in settings.
			</Text>
		) : (
			<List
				style={styles.tagList}
				horizontal={true}
				data={profile.tags}
				renderItem={({ item }) => (
					<Card key={item} style={{ marginHorizontal: 4 }}>
						<Text
							style={{
								marginHorizontal: -16,
								marginVertical: -10,
							}}
						>
							{item}
						</Text>
					</Card>
				)}
			/>
		);
	return (
		<SafeAreaView>
			<ScrollView>
				<ImageBackground
					style={styles.header}
					source={require("../../assets/background.png")}
				>
					<View
						style={[
							StyleSheet.absoluteFill,
							{ backgroundColor: "rgba(0, 0, 0, 0.45)" },
						]}
					/>

					<Avatar
						style={styles.profileAvatar}
						source={{ uri: profile.profilePicture }}
					/>

					<Text
						style={styles.profileName}
						category="h5"
						status="control"
					>
						{profile.name}
					</Text>

					<View style={styles.numbersContainer}>
						<View style={styles.numbersItem}>
							<Text category="s2" status="control">
								Clubs
							</Text>
							<Text category="c2" status="control">
								{profile.clubs.length}
							</Text>
						</View>

						<View style={styles.numbersItem}>
							<Text category="s2" status="control">
								Interests
							</Text>
							<Text category="c2" status="control">
								{profile.tags.length}
							</Text>
						</View>

						<View style={styles.numbersItem}>
							<Text category="s2" status="control">
								Joined
							</Text>
							<Text category="c2" status="control">
								'21
							</Text>
						</View>
					</View>
				</ImageBackground>

				<Layout>
					<Text style={[styles.label, styles.text]} category="s1">
						About
					</Text>

					<Text style={styles.text} appearance="hint">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam.
					</Text>

					<Text style={[styles.label, styles.text]} category="s1">
						Interests
					</Text>

					{tagList}
				</Layout>

				<List
					data={profile.clubs}
					ItemSeparatorComponent={Divider}
					renderItem={({ item }) => (
						<ClubListItem
							club={item}
							onPress={() =>
								nav.navigate("ClubNavigator", {
									title: item.name,
									screen: "Club",
									params: {
										id: item.id,
										title: item.name,
										role: item.role,
									},
								})
							}
						/>
					)}
					style={{ marginVertical: 10 }}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingVertical: 24,
		alignItems: "center",
	},
	profileAvatar: {
		width: 124,
		height: 124,
		borderRadius: 62,
		marginBottom: 16,
		borderWidth: 1,
	},
	profileName: {
		zIndex: 1,
	},
	numbersContainer: {
		flexDirection: "row",
		width: "75%",
		marginTop: 16,
	},
	numbersItem: {
		alignItems: "center",
		flex: 1,
		marginHorizontal: 16,
	},
	label: {
		marginTop: 24,
		marginBottom: 8,
	},
	text: {
		marginHorizontal: 16,
	},
	tagList: {
		backgroundColor: "transparent",
		marginBottom: 16,
		marginHorizontal: 8,
		overflow: "hidden",
	},
});

export default ProfileScreen;
