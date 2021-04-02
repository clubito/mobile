import * as Yup from "yup";

class CreateAnnouncementModel {
	constructor(
		readonly title: string,
		readonly body: string
	) {}

	static empty(): CreateAnnouncementModel {
		return new CreateAnnouncementModel(
			"",
			""
		);
	}
}

const CreateAnnouncementSchema = Yup.object().shape({
	title: Yup.string().required("Please enter a name for the announcement"),
	body: Yup.string().required("Please enter a body for the announcement")
});

export { CreateAnnouncementModel, CreateAnnouncementSchema };
