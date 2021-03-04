import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Button,
	FlatList,
	StyleSheet,
	Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	IndexPath,
	Input,
	Layout,
	Select,
	SelectItem,
} from "@ui-kitten/components";
import { Club } from "../../types";
import ClubListItem from "../../components/ClubListItem";
import ClubService from "../../services/ClubService";

const SearchScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [clubs, setClubs] = useState([] as Club[]);
	const query = useRef("");

	const [filters, setFilters] = useState([] as string[]);
	const [filterSelection, setFilterSelection] = useState([] as IndexPath[]);

	const sorts: string[] = ["Default", "Tag"];
	const [sortSelection, setSortSelection] = useState<IndexPath>();

	useEffect(() => {
		ClubService.getAllTags().then((tagList) => setFilters(tagList));
	}, []);

	const handleSearch = () => {
		setIsLoading(true);
		ClubService.search(
			query.current,
			mapSortSelection(),
			mapFilterSelections()
		).then((clubList) => {
			setClubs(clubList);
			setIsLoading(false);
		});
	};

	const mapFilterSelections = () => {
		const list: string[] = [];
		filterSelection.forEach((index) => {
			list.join(filters[index.row]);
		});
		return list;
	};

	const mapSortSelection = () => {
		return sorts[sortSelection?.row ?? 0];
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
				returnKeyType="search"
				defaultValue={query.current}
				clearButtonMode="always"
				onSubmitEditing={(event) => {
					query.current = event.nativeEvent.text;
					handleSearch();
				}}
			/>

			<Layout style={styles.selectContainer}>
				<Select
					placeholder="Select Filters"
					multiSelect={true}
					style={styles.select}
					value={() => (
						<Text>
							{filterSelection.length == 0
								? "Select Filters"
								: filterSelection.length + " selected"}
						</Text>
					)}
					size="small"
					selectedIndex={filterSelection}
					onSelect={(index) => setFilterSelection(index)}
				>
                    <Button title="Apply" onPress={() => handleSearch()} />
					{filters.map((filter) => {
						return <SelectItem title={filter} key={filter} />;
					})}
				</Select>

				<Select
					placeholder="Sort By"
					style={styles.select}
					value={mapSortSelection()}
					size="small"
					selectedIndex={sortSelection}
					onSelect={(index) => setSortSelection(index)}
				>
					{sorts.map((filter) => {
						return <SelectItem title={filter} key={filter} />;
					})}
				</Select>
			</Layout>

			<FlatList
				data={clubs}
				keyExtractor={(item) => item.objectId}
				keyboardDismissMode="on-drag"
				contentContainerStyle={styles.clubList}
				renderItem={({ item }) => <ClubListItem club={item} />}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	selectContainer: {
		flexDirection: "row",
	},
	select: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
	},
	clubList: {
		flexGrow: 1,
	},
});

export default SearchScreen;
