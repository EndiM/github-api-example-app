export const makeOrganisationQuery = ({ username }) => {
	const query = `
	query ($username: String!) {
		repositoryOwner(login: $username) {
		... on Organization {
			id
			login
			name
			location
			avatarUrl
			repositories {
			totalCount
			}
		}
		}
	}
`;
	const variables = {
		username: `${username}`
	};
	return JSON.stringify({ query, variables });
};


