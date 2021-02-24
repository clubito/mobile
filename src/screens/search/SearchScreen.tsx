import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Input, Layout } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
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
		<Layout style={styles.container}>
			<SafeAreaView edges={["top"]} />

			<Input
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
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
});

export default SearchScreen;
