import axios, { AxiosResponse } from "axios";
import API from "./API";

export default class ImageService {
	/**
	 * Upload image to S3 and return URL.
	 */
	static async upload(imageUri: string) {
		// If any picture is selected, upload to S3
		const urlResponse: AxiosResponse = await API.get("/file");
		const uploadUrl: string = urlResponse.data.presignedUrl;

		let blob = await (await fetch(imageUri)).blob();
		await axios.put(uploadUrl, blob, {
			headers: { "Content-Type": "image/png" },
		});

		return uploadUrl.substring(0, uploadUrl.indexOf("?"));
	}
}
