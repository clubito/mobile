import React, { useEffect, useState } from "react";
import { Dimensions, Image, Platform, SafeAreaView, View } from "react-native";
import { ContainerStyles } from "../../styles/CommonStyles";
import {
	Text,
	Card,
	Button,
	Popover,
	Menu,
	MenuItem,
	Modal,
} from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getReadableDate } from "../../utils";
import { Announcement, Club, Event, User } from "../../types";
import ClubService from "../../services/ClubService";
import AnnouncementList from "./AnnouncementList";
import EventTab from "./EventTab";
import { ClubParamList } from "./ClubNavigator";
import MemberTab from "./MemberTab";
import CoolCard from "../../components/CoolCard";
import FloatingButton from "../../components/FloatingButton";
import GeneralModal from "../../components/GeneralModal";
import LoadingScreen from "../../components/LoadingScreen";
import { PlusIcon } from "../../components/Icons";
import { hasPermission, RolePermissions } from "../../utils/permissions";
import EmptyView from "../../components/EmptyView";
import Carousel from "react-native-snap-carousel";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ImagePicker } from "expo";

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
	const [imageModal, setImageModal] = useState(false);
	const [images, setImages] = useState([] as string[]);
	const [viewportWidth, setWidth] = useState(Dimensions.get("window").width);
	const [imageWidth, setImageWidth] = useState(
		Dimensions.get("window").width - 50
	);
	const [imageHeight, setImageHeight] = useState(0);
	const [modalDims, setModalDims] = useState([0, 0]);
	const [newImage, setNewImage] = useState("");

	useEffect(() => {
		refresh();
	}, []);
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			refresh();
		});
		return unsubscribe;
	}, [navigation]);

	const refresh = () => {
		setIsLoading(true);
		ClubService.getGallery(props.route.params.clubId).then((images) => {
			setImages(images);
			setIsLoading(false);
		});
	};

	if (isLoading) {
		return <LoadingScreen />;
	}
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			exif: false,
		});

		if (!result.cancelled) {
			setNewImage(result.uri);
		}
	};
	const _renderItem1 = (item: { item: any; index: number }) => {
		Image.getSize(item.item, (width, height) => {
			setImageHeight(height / (width / imageWidth));
		});
		return (
			<View>
				<Image
					source={{ uri: images[viewImage] }}
					style={{
						width: imageWidth,
						height: imageHeight,
					}}
				/>
			</View>
		);
	};

	const triggerModal = (index: number) => {
		setViewImage(index);
		Image.getSize(images[viewImage], (width, height) => {
			// calculate image width and height
			const screenWidth = Dimensions.get("window").width - 80;
			const scaleFactor = width / screenWidth;
			const imageHeight = height / scaleFactor;
			setModalDims([screenWidth, imageHeight]);
		});
		setImageModal(true);
	};

	const deleteItem = () => {
		var deleted = images;
		deleted.splice(viewImage, 1);
		ClubService.updateGallery(props.route.params.clubId, deleted);
	};
	const addItem = () => {
		if (newImage !== "")
			ClubService.updateGallery(
				props.route.params.clubId,
				images.concat(newImage)
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
						itemWidth={imageWidth}
						containerCustomStyle={{
							flexGrow: 0,
							marginVertical: 10,
						}}
						onSnapToItem={(e) => {
							setViewImage(e);
						}}
					/>
					<Button
						onPress={() => {}}
						style={{ width: 100 }}
						status={"danger"}
					>
						{"Delete Image"}
					</Button>
				</>
			) : (
				<EmptyView message="This club doesn't have any images" />
			)}
			<Modal
				visible={imageModal}
				backdropStyle={ContainerStyles.modalBackdrop}
				onBackdropPress={() => setImageModal(false)}
			>
				<CoolCard
					yip
					style={ContainerStyles.extraMargin}
					footer={() => (
						<View
							style={
								(ContainerStyles.flexContainer,
								{ flexDirection: "row" })
							}
						>
							<Button
								onPress={() => setImageModal(false)}
								style={{ flex: 1, margin: 10 }}
								status="basic"
							>
								Cancel
							</Button>
							<Button
								onPress={() => {
									deleteItem;
								}}
								style={{ flex: 1, margin: 10 }}
								status={"danger"}
							>
								Delete Image
							</Button>
						</View>
					)}
				>
					<Image
						source={{ uri: images[viewImage] }}
						style={{
							width: modalDims[0],
							height: modalDims[1],
						}}
					/>
				</CoolCard>
			</Modal>
		</SafeAreaView>
	);
};

export default ClubScreen;
