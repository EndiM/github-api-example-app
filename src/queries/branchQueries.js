export const makeRepositoryBranchesQuery = ({ repoName, orgName, paginationSection}) => {
	const query = `
	query ($repoName: String!, $orgName: String!) {
		repository(name: $repoName, owner: $orgName) {
		 refs(${paginationSection}, refPrefix:"refs/heads/") {
			totalCount
		  pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
				}
			nodes {
			 name
		   }
		 }
	   }
	 }
   `;
	const variables = {
		repoName,
		orgName
	};
	return JSON.stringify({ query, variables });
};



