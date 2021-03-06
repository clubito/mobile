import * as Yup from "yup";
import { IndexPath } from "@ui-kitten/components";

class ProfileSetupModel {
	constructor(
		readonly name: string,
		readonly profilePicture: string,
		readonly tags: IndexPath[]
	) {}

	static empty(): ProfileSetupModel {
		return new ProfileSetupModel("", "https://picsum.photos/200", []);
	}
}

const ProfileSetupSchema = Yup.object().shape({
	name: Yup.string().required("Enter a name"),
	tags: Yup.array().min(1, "Select at least one tag"),
});

export { ProfileSetupModel, ProfileSetupSchema };
