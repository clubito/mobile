import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import { TextInput } from "react-native-gesture-handler";
import { Club } from "../../types";
import ClubListItem from "../../components/ClubListItem";
import ClubService from "../../services/ClubService";

const SearchScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [filters, setFilters] = useState([] as string[]);
	const [clubs, setClubs] = useState([] as Club[]);
	const query = useRef("");

	const handleSearch = () => {
		setIsLoading(true);
		ClubService.search(query.current, filters).then((clubList) => {
			setClubs(clubList);
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
				data={clubs}
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
