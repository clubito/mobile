import axios from "axios";

const state = { token: "" };

const API = axios.create({
	baseURL: "https://server.clubito.me",
});

API.defaults.validateStatus = function () {
	return true;
};

/**
 * Set user token for all network api calls.
 * This MUST be set on app start and on successful login.
 */
export function setUserToken(token: string) {
	state.token = token;
	API.interceptors.request.use(function (config) {
		config.headers.Authorization = "Bearer " + state.token;
		return config;
	});
}

export default API;
