import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	TouchableHighlight,
} from "react-native";
import { TextStyle, ContainerStyles } from "../../styles/CommonStyles";
import { Text, Card, Divider, Button, Modal } from "@ui-kitten/components";
import UserService from "../../services/UserService";
import { Profile } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";
import TagPicker from "../../components/TagPicker";

const ProfileScreen = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [checked, setChecked] = useState([] as string[]);
	useEffect(() => {
		if (profile === null) {
			UserService.getUserProfile().then((data) => {
				setProfile(data);
				setChecked(data.tags);
			});
		}
	});
	if (profile === null) {
		return (
			<View style={TextStyle.center}>
				<Text>An error has occurred, no user data could be found</Text>
			</View>
		);
	}
	const onTagsChange = (checkedTags: string[]) => {
		if (checkedTags != checked) {
			setChecked(checkedTags);
		}
	};
	const submitChecklist = () => {
		console.log(checked);
	};
	const tagListTotal = [
		"tag0",
		"tag1",
		"tag2",
		"tag3",
		"tag4",
		"tag5",
		"tag6",
		"tag7",
		"tag8",
		"tag9",
		"tag10",
		"tag11",
		"tag12",
		"tag13",
		"tag14",
		"tag15",
		"tag16",
		"tag17",
		"tag18",
		"tag19",
	];
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
				<View style={{ flexDirection: "row", marginTop: 10 }}>
					<View style={{ flexDirection: "column", flex: 1 }}>
						<Text category="h6" style={ContainerStyles.lowerMargin}>
							Tags
						</Text>
						<Text appearance="hint">{profile.tags.join(", ")}</Text>
					</View>
					<Button
						onPress={() => {
							setModalVisible(true);
						}}
						accessoryLeft={() => (
							<MaterialIcons name="create" size={20} />
						)}
						style={{
							aspectRatio: 1,
							marginVertical: "auto",
						}}
					/>
				</View>
				<Divider style={TextStyle.divider} />
				<Modal
					visible={modalVisible}
					backdropStyle={ContainerStyles.modalBackdrop}
					onBackdropPress={() => setModalVisible(false)}
				>
					<Card
						header={() => (
							<View style={{ margin: 10 }}>
								<Text category="h6">Edit Tags</Text>
							</View>
						)}
						footer={() => (
							<View style={{ flex: 1, flexDirection: "row" }}>
								<Button
									onPress={() => setModalVisible(false)}
									style={{ flex: 1, margin: 10 }}
								>
									Cancel
								</Button>
								<Button
									onPress={submitChecklist}
									style={{ flex: 1, margin: 10 }}
								>
									Confirm
								</Button>
							</View>
						)}
						style={{ minWidth: "80%" }}
					>
						<TagPicker
							closeFunction={() => setModalVisible(false)}
							functionOnConfirm={onTagsChange}
							content={tagListTotal}
							checked={profile.tags}
						/>
					</Card>
				</Modal>
			</View>
		</SafeAreaView>
	);
};
export default ProfileScreen;
