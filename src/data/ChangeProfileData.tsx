import * as Yup from "yup";
import { IndexPath } from "@ui-kitten/components";

class ChangeProfileModel {
	constructor(
		readonly name: string,
		readonly profilePicture: string,
		readonly tags: IndexPath[]
	) {}

	static empty(): ChangeProfileModel {
		return new ChangeProfileModel("", "", []);
	}
}

const ChangeProfileSchema = Yup.object().shape({
	name: Yup.string(),
	tags: Yup.array(),
	profilePicture: Yup.string(),
});

export { ChangeProfileModel, ChangeProfileSchema };
