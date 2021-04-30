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
import { PlusIcon } from "../../components/Icons";

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
	const [curImage, setCurImage] = useState("");
	const [modalType, setModalType] = useState(false);

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
		ClubService.getGallery(props.route.params.clubId).then((images) => {
			setImages(images);
			console.log(images);
			setIsLoading(false);
			navigation.setOptions({
				headerRight: () => (
					<Button
						appearance="ghost"
						onPress={pickImage}
						accessoryLeft={PlusIcon}
					/>
				),
			});
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
			triggerAddModal(result.uri);
		}
	};
	const _renderItem1 = (item: { item: any; index: number }) => {
		Image.getSize(item.item, (width, height) => {
			// setImageHeight(height / (width / imageWidth));
			setImageHeight(300);
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

	const triggerDeleteModal = (index: number) => {
		setCurImage(images[index]);
		Image.getSize(images[index], (width, height) => {
			// calculate image width and height
			const screenWidth = Dimensions.get("window").width - 80;
			const scaleFactor = width / screenWidth;
			const imageHeight = height / scaleFactor;
			setModalDims([screenWidth, imageHeight]);
		});
		setModalType(false);
		setImageModal(true);
	};

	const triggerAddModal = (uri: string) => {
		setCurImage(uri);
		Image.getSize(uri, (width, height) => {
			// calculate image width and height
			const screenWidth = Dimensions.get("window").width - 80;
			const scaleFactor = width / screenWidth;
			const imageHeight = height / scaleFactor;
			setModalDims([screenWidth, imageHeight]);
		});
		setModalType(true);
		setImageModal(true);
	};

	const deleteItem = () => {
		var deleted = images;
		deleted.splice(viewImage, 1);
		ClubService.updateGallery(props.route.params.clubId, deleted);
	};
	const addItem = () => {
		if (newImage !== "") {
			console.log("IM", images);
			ClubService.updateGallery(
				props.route.params.clubId,
				images.length > 0 ? images.concat(newImage) : [newImage]
			)
				.then((data) => {
					toast?.show(data.message, {
						type: "success",
					});
					refresh();
				})
				.catch((error) => {
					toast?.show(error.message, {
						type: "danger",
					});
				});
		}
	};

	return (
		<SafeAreaView style={ContainerStyles.flexContainer}>
			{images.length > 0 ? (
				<>
					{/* <Carousel
						data={images}
						renderItem={_renderItem1}
						sliderWidth={viewportWidth}
						itemHeight={300}
						itemWidth={imageWidth}
						sliderHeight={300}
						containerCustomStyle={{
							flexGrow: 0,
							marginVertical: 10,
						}}
						onSnapToItem={(e) => {
							setViewImage(e);
						}}
					/> */}
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
							{modalType ? (
								<Button
									onPress={() => addItem()}
									style={{ flex: 1, margin: 10 }}
									status={"success"}
								>
									Add Image
								</Button>
							) : (
								<Button
									onPress={deleteItem}
									style={{ flex: 1, margin: 10 }}
									status={"danger"}
								>
									Delete Image
								</Button>
							)}
						</View>
					)}
				>
					<Image
						source={{ uri: curImage }}
						style={{
							width: modalDims[0],
							height: modalDims[1],
						}}
					/>
				</CoolCard>
			</Modal>
			<Button
				appearance="ghost"
				onPress={pickImage}
				accessoryLeft={PlusIcon}
			/>
		</SafeAreaView>
	);
};

export default ClubScreen;
