import React, { useState, useEffect } from "react";
import { View, Platform, TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Icon } from "@ui-kitten/components";

interface ProfilePictureSettings {
	functionOnConfirm: StrFunction;
	pfp?: string;
}

type StrFunction = (arg0: string) => void;

const ProfilePicturePicker = (props: ProfilePictureSettings) => {
	const [image, setImage] = useState<string>("https://picsum.photos/200");

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
		if (props.pfp !== undefined) setImage(props.pfp);
	}, []);
	useEffect(() => {
		if (image !== "") props.functionOnConfirm(image);
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

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<TouchableWithoutFeedback onPress={pickImage}>
				<Avatar
					style={{ height: 200, width: 200 }}
					shape="round"
					source={{ uri: image }}
				/>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default ProfilePicturePicker;
