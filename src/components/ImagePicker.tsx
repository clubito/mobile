import React, { useState, useEffect } from "react";
import {
	Button,
	Image,
	View,
	Platform,
	TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
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
	}, []);

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
		<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
	) : (
		<MaterialIcons name="account-box" size={200} />
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
}
