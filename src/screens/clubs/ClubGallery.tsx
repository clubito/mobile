import React, { useEffect, useState } from "react";
import { Dimensions, Image, Platform, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import { Button, Modal, Icon } from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import ClubService from "../../services/ClubService";
import { ClubParamList } from "./ClubNavigator";
import CoolCard from "../../components/CoolCard";
import LoadingScreen from "../../components/LoadingScreen";
import EmptyView from "../../components/EmptyView";
import Carousel from "react-native-snap-carousel";
import * as ImagePicker from "expo-image-picker";
import { PlusIcon1 } from "../../components/Icons";

type ClubScreenRouteProp = RouteProp<ClubParamList, "ClubGallery">;
type ClubScreenNavigationProp = StackNavigationProp<
	ClubParamList,
	"ClubGallery"
>;

type Props = {
	route: ClubScreenRouteProp;
	navigation: ClubScreenNavigationProp;
};

const ClubScreen = (props: Props) => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [viewImage, setViewImage] = useState(0);
	const [images, setImages] = useState([] as string[]);
	const [viewportWidth, setWidth] = useState(Dimensions.get("window").width);
	const [imageWidth, setImageWidth] = useState(
		Dimensions.get("window").width - 50
	);
	const [imageHeight, setImageHeight] = useState(0);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
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
			refresh();
		});
		return unsubscribe;
	}, [navigation]);

	const refresh = () => {
		setIsLoading(true);
		ClubService.getGallery(props.route.params.clubId)
			.then((images) => {
				console.log(images[0]);
				const imagesArr1 = images[0].split(",").map(String);
				const images1 = imagesArr1.map((i: String) => i.trim());
				setImages(images1);
				setIsLoading(false);
			})
			.catch((error) => {
				toast?.show(error.message, {
					type: "danger",
				});
			});
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	const _renderItem1 = (item: { item: any; index: number }) => {
		Image.getSize(item.item, (width, height) => {
			setImageHeight(height / (width / imageWidth));
		});
		return (
			<View>
				<Image
					source={{ uri: item.item }}
					style={{
						width: imageWidth,
						height: imageHeight,
					}}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			{images.length > 0 ? (
				<>
					<Carousel
						data={images}
						renderItem={_renderItem1}
						sliderWidth={viewportWidth}
						itemHeight={imageHeight}
						itemWidth={imageWidth}
						containerCustomStyle={{
							flexGrow: 0,
							marginVertical: 10,
						}}
						onSnapToItem={(e) => {
							setViewImage(e);
						}}
					/>
				</>
			) : (
				<EmptyView message="This club doesn't have any images" />
			)}
		</SafeAreaView>
	);
};

export default ClubScreen;
