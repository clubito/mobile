import React, { useState, useEffect } from "react";
import { Image, View, Platform, TouchableHighlight } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Icon } from "@ui-kitten/components";

interface ProfilePictureSettings {
	functionOnConfirm: Function;
	pfp: string | null;
}

const ProfilePicturePicker = (props: ProfilePictureSettings) => {
	const [image, setImage] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const {
					status,
				} = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert(
						"Camera permissions are necessary to complete this process."
					);
				}
			}
		})();
		if (props.pfp !== null) setImage(props.pfp);
	}, []);
	useEffect(() => {
		props.functionOnConfirm(image);
	}, [image]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			exif: false,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const picture = image ? (
		<Avatar source={{ uri: image }} style={{ width: 200, height: 200 }} />
	) : (
		<Icon
			name="person"
			fill="#8F9BB3"
			style={{ width: 200, height: 200 }}
		/>
	);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<TouchableHighlight onPress={pickImage}>
				{picture}
			</TouchableHighlight>
		</View>
	);
};

export default ProfilePicturePicker;
