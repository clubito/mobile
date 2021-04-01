import * as Yup from "yup";

class CreateEventModel {
	constructor(
		readonly name: string,
		readonly description: string,
		readonly startTime: Date,
		readonly endTime: Date,
		readonly longitude: number,
		readonly latitude: number,
		readonly shortLocation: string,
		readonly picture: string
	) {}

	static empty(): CreateEventModel {
		return new CreateEventModel(
			"",
			"",
			new Date(),
			new Date(),
			0,
			0,
			"",
			"https://picsum.photos/200"
		);
	}
}

const CreateEventSchema = Yup.object().shape({
	name: Yup.string().required("Please enter a name for the event"),
	description: Yup.string(),
	startTime: Yup.date().required("Please enter a start date"),
	endTime: Yup.date().required("Please enter an end date"),
	longitude: Yup.number(),
	latitude: Yup.number(),
	shortLocation: Yup.string(),
	picture: Yup.string(),
});

export { CreateEventModel, CreateEventSchema };
