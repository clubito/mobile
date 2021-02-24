import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { TextInput } from "react-native-gesture-handler";
import { Club } from "../../types";
import ClubListItem from "../../components/ClubListItem";
import ClubService from "../../services/ClubService";

const SearchScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const query = useRef("");
	const filters = useRef([] as string[]);
	const clubs = useRef([] as Club[]);

	const handleSearch = () => {
		setIsLoading(true);
		ClubService.search(query.current, filters.current).then((clubList) => {
			clubs.current = clubList;
			setIsLoading(false);
		});
	};

	if (isLoading) {
		return (
			<Layout style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	return (
		<View>
			<TextInput
				placeholder="Search"
				defaultValue={query.current}
				onSubmitEditing={(event) => {
					query.current = event.nativeEvent.text;
					handleSearch();
				}}
			/>
			<FlatList
				data={clubs.current}
				keyExtractor={(item) => item.objectId}
				renderItem={({ item }) => <ClubListItem club={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
});

export default SearchScreen;
