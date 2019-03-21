
import { BASE_API_URL, TOKEN } from '../constants';
export const remoteFetch = ({ body }) => {
	return fetch(BASE_API_URL, {
		method: 'POST',
		headers: new Headers({
			'Authorization': `Token ${TOKEN}`,
			'Content-Type': 'application/graphql'
		}),
		body
	});
};
