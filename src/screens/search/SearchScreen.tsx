import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Divider,
	IndexPath,
	Input,
	Select,
	SelectItem,
	Text,
} from "@ui-kitten/components";
import { Club } from "../../types";
import ClubListItem from "../../components/ClubListItem";
import ClubService from "../../services/ClubService";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../components/LoadingScreen";
import CoolView from "../../components/CoolView";
import { SearchIcon } from "../../components/Icons";
import EmptyView from "../../components/EmptyView";

const SearchScreen = () => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [clubs, setClubs] = useState([] as Club[]);
	const query = useRef("");

	const [filters, setFilters] = useState([] as string[]);
	const [filterSelection, setFilterSelection] = useState([] as IndexPath[]);

	const sorts: string[] = ["Default", "Name"];
	const [sortSelection, setSortSelection] = useState<IndexPath>();

	useEffect(() => {
		ClubService.getAllTags().then((tagList) => setFilters(tagList));
		handleSearch();
	}, []);

	useEffect(() => {
		handleSearch();
	}, [sortSelection]);

	const handleSearch = () => {
		setIsLoading(true);
		ClubService.search(
			query.current,
			mapSortSelection(),
			mapFilterSelections()
		)
			.then((clubList) => {
				setClubs(clubList);
			})
			.finally(() => setIsLoading(false));
	};

	const mapFilterSelections = () => {
		const list: string[] = [];
		filterSelection.forEach((index) => {
			list.push(filters[index.row]);
		});
		return list;
	};

	const mapSortSelection = () => {
		return sorts[sortSelection?.row ?? 0];
	};

	return (
		<CoolView style={styles.container}>
			<SafeAreaView edges={["top"]} />

			<Input
				placeholder="Search"
				returnKeyType="search"
				defaultValue={query.current}
				clearButtonMode="while-editing"
				accessoryRight={SearchIcon}
				onChangeText={(text) => (query.current = text)}
				onSubmitEditing={(event) => {
					handleSearch();
				}}
			/>

			<CoolView style={styles.selectContainer}>
				<Select
					placeholder={() => <Text>"Select Filters"</Text>}
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
					onSelect={(index) => {
						setSortSelection(index);
					}}
				>
					{sorts.map((filter) => {
						return <SelectItem title={filter} key={filter} />;
					})}
				</Select>
			</CoolView>

			{isLoading ? (
				<LoadingScreen />
			) : (
				<FlatList
					data={clubs}
					keyExtractor={(item) => item.id}
					keyboardDismissMode="on-drag"
					contentContainerStyle={styles.clubList}
					ItemSeparatorComponent={Divider}
					ListEmptyComponent={() => (
						<EmptyView message="No clubs found" />
					)}
					renderItem={({ item }) => (
						<ClubListItem
							club={item}
							onPress={() =>
								navigation.navigate("ClubNavigator", {
									title: item.name,
									screen: "Club",
									params: {
										id: item.id,
										title: item.name,
										role: item.role,
									},
								})
							}
						/>
					)}
				/>
			)}
		</CoolView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 8,
	},
	selectContainer: {
		flexDirection: "row",
		marginBottom: 8,
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
