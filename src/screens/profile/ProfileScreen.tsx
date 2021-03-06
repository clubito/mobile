import React, { useContext, useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	StyleSheet,
	ImageBackground,
	FlatList,
} from "react-native";
import {
	Text,
	Card,
	List,
	Avatar,
} from "@ui-kitten/components";
import UserService from "../../services/UserService";
import { User } from "../../types";
import ClubListItem from "../../components/ClubListItem";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClubParamList } from "../clubs/ClubNavigator";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";
import CoolDivider from "../../components/CoolDivider";

type ProfileRouteProp = RouteProp<ClubParamList, "Profile">;
type ProfileNavigationProp = StackNavigationProp<ClubParamList, "Profile">;

type Props = {
	route: ProfileRouteProp;
	navigation: ProfileNavigationProp;
};

const ProfileScreen = (props: Props) => {
	const nav = useNavigation<StackNavigationProp<any>>();
	const [profile, setProfile] = useState({} as User);
	const [isLoading, setIsLoading] = useState(true);
	const { logOutSuccess } = useContext(AuthContext);

	const getUserData = () => {
		UserService.getCurrentUser()
			.then((data) => {
				setProfile(data);
				setIsLoading(false);
			})
			.catch((data) => {
				AuthService.logout().then(() => {
					nav.navigate("Home");
					logOutSuccess();
				});
			});
	};

	const getOtherUser = (userId: string) => {
		UserService.getOtherUser(userId).then((data) => {
			setProfile(data);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		const unsubscribe = nav.addListener("focus", () => {
			if (props.route.params && props.route.params.userId) {
				getOtherUser(props.route.params.userId);
			} else getUserData();
		});
		return unsubscribe;
	}, [nav]);

	if (isLoading) {
		return <LoadingScreen />;
	}

	const tagList =
		profile.tags.length === 0 ? (
			<Text style={[styles.text, { marginBottom: 16 }]} appearance="hint">
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

				<CoolView yip>
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
				</CoolView>

				<CoolView style={{ marginVertical: 10 }} yip>
					<FlatList
						data={profile.clubs}
						ItemSeparatorComponent={CoolDivider}
						renderItem={({ item }) => (
							<ClubListItem
								club={item}
								onPress={() =>
									nav.push("ClubNavigator", {
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
					/>
				</CoolView>
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
