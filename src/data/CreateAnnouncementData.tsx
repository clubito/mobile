import * as Yup from "yup";

class CreateAnnouncementModel {
	constructor(
		readonly message: string
	) {}

	static empty(): CreateAnnouncementModel {
		return new CreateAnnouncementModel(
			"",
			""
		);
	}
}

const CreateAnnouncementSchema = Yup.object().shape({
	message: Yup.string().required("Please enter a message for the announcement")
});

export { CreateAnnouncementModel, CreateAnnouncementSchema };
