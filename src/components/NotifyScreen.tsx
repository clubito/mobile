import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Layout, Button } from "@ui-kitten/components";
import { ContainerStyles } from "../styles/CommonStyles";

interface Props {
	message: string;
}

const NotifyScreen = (props: Props) => {
	const navigation = useNavigation();

	return (
		<Layout style={ContainerStyles.center}>
			<Text>{props.message}</Text>
			<Button onPress={() => navigation.goBack()}>OKAY</Button>
		</Layout>
	);
};

export default NotifyScreen;
