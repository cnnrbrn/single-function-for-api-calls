import getToken from "../helpers/getToken.js";

export default function createOptions(method = "GET", bodyData = null, headers = {}, includeToken = false) {
	const options = {
		method: method,
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			...headers,
		},
	};

	if (includeToken) {
		const token = getToken();
		if (token) {
			options.headers.Authorization = `Bearer ${token}`;
		}
	}

	if (bodyData) {
		options.body = JSON.stringify(bodyData);
	}

	return options;
}
