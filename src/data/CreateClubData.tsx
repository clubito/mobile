import { IndexPath } from "@ui-kitten/components";
import * as Yup from "yup";

class CreateClubModel {
	constructor(
		readonly name: string,
		readonly description: string,
		readonly picture: string,
		readonly tags: IndexPath[],
		readonly theme: string
	) {}

	static empty(): CreateClubModel {
		return new CreateClubModel(
			"",
			"",
			"https://picsum.photos/200",
			[],
			"ffffff"
		);
	}
}

const CreateClubSchema = Yup.object().shape({
	name: Yup.string().required("Please enter a name for the club"),
	description: Yup.string().required(
		"Please enter a description for the club"
	),
	picture: Yup.string(),
	tags: Yup.array()
		.min(1, "Please choose at least one tag for the club")
		.required("Please choose at least one tag for the club"),
	theme: Yup.string().min(6, "Invalid format for theme hex"),
});

export { CreateClubModel, CreateClubSchema };
