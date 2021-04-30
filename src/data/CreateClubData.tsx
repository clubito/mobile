import { IndexPath } from "@ui-kitten/components";
import * as Yup from "yup";

class CreateClubModel {
	constructor(
		readonly name: string,
		readonly description: string,
		readonly logo: string,
		readonly tags: IndexPath[]
	) {}

	static empty(): CreateClubModel {
		return new CreateClubModel("", "", "https://picsum.photos/200", []);
	}
}

const CreateClubSchema = Yup.object().shape({
	name: Yup.string().min(3, "The name must be at least 3 characters long").required("Please enter a name for the club"),
	description: Yup.string().min(20, "The description must be at least 20 characters").required(
		"Please enter a description for the club"
	),
	logo: Yup.string(),
	tags: Yup.array()
		.min(1, "Please choose at least one tag for the club")
		.required("Please choose at least one tag for the club")
});

export { CreateClubModel, CreateClubSchema };
