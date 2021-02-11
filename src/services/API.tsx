import axios from "axios";

const API = axios.create({
	baseURL: "https://base.url",
});

/**
 * Set user token for all network api calls.
 * This MUST be set on app start and on successful login.
 */
export function setUserToken(token: string) {
	API.interceptors.request.use(function (config) {
		config.headers.Authorization = "Bearer " + token;
		return config;
	});
}

export default API;
