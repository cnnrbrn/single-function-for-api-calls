import { BASE_URL } from "../constants/api.js";

export default async function makeApiCall(endpoint, options = {}) {
	let data, error;

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, options);
		const json = await response.json();

		if (response.ok) {
			data = json;
		} else {
			error = extractError(json);
		}
	} catch (err) {
		error = err.toString();
	}

	return { data, error };
}

function extractError(responseData) {
	if (responseData && responseData.errors && Array.isArray(responseData.errors)) {
		return responseData.errors.map((error) => error.message).join("\n");
	}
	return "There was an error processing the request.";
}
