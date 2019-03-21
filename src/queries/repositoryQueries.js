export const makeOrganisationRepositoriesQuery = ({ paginationSection, insertFilter, orgName }) => {
	const query = `
	query ($queryString: String!) {
		search(query: $queryString, type: REPOSITORY, ${paginationSection}) {
		  pageInfo {
			startCursor
			endCursor
			hasNextPage
			hasPreviousPage
		  }
		  repositoryCount
		  edges {
			node {
			  ... on Repository {
				id
				name
				forkCount
				primaryLanguage {
				  id
				  name
				}
				stargazers {
				  totalCount
				}
				issues {
				  totalCount
				}
			  }
			}
		  }
		}
	  }
   `;
	const variables = {
		queryString: `org:${orgName} fork:true ${insertFilter}`
	};
	return JSON.stringify({ query, variables });
};

export const makeLanguagesQuery = ({ orgName, next }) => {
	const query = `
		query ($orgName: String!) {
			search(query: $orgName, type: REPOSITORY, first: 100 ${next}) {
			  pageInfo {
				startCursor
				endCursor
				hasNextPage
			  }
			  edges {
				node {
				  ... on Repository {
					primaryLanguage {
					  name
							}
						}
					}
				}
			}
		}
	   `;

	const variables = {
		orgName: `org:${orgName} fork:true`
	};
	return JSON.stringify({ query, variables });
};


