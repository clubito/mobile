import React from "react";
import { RouteProp } from "@react-navigation/native";
import { View } from "react-native";

type ChatParamList = {
	Chat: { id: string };
};

type ChatRouteProp = RouteProp<ChatParamList, "Chat">;

type Props = {
	route: ChatRouteProp;
};

const ChatScreen = (props: Props) => {
	return <View></View>;
};

export default ChatScreen;
