
import { remoteFetch } from '../api';
import { makeRepositoryBranchesQuery } from '../queries/branchQueries';
const branchActions = store => ({
	getRepositoryBranches: (state, { orgName, repoName, direction }) => {
		store.setState({ fetchingBranches: true });

		let paginationSection = ``;
		const { pageInfo } = state.branches;
		switch (direction) {
			case 'previous': {
				paginationSection = `last: ${state.pagination.perPage}, before:"${pageInfo.startCursor}"`;
				break;
			}
			case 'next': {
				paginationSection = `first: ${state.pagination.perPage}, after:"${pageInfo.endCursor}"`;
				break;
			}
			default: paginationSection = `first: ${state.pagination.perPage}`;
		}

		const body = makeRepositoryBranchesQuery({ paginationSection, orgName, repoName });
		remoteFetch({ body })
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(responseData => {
				if (responseData.errors != undefined) { // eslint-disable-line eqeqeq
					throw new Error();
				}
				store.setState({
					branches: Object.assign(
						{},
						{
							items: [...responseData.data.repository.refs.nodes],
							totalCount: responseData.data.repository.refs.totalCount,
							pageInfo: Object.assign({}, state.branches.pageInfo, responseData.data.repository.refs.pageInfo)
						}),
					fetchingBranches: false,
					error: false
				});
			})
			.catch(() => store.setState({
				fetchingBranches: false,
				error: true
			}));
	},
	clearBranchList: () => store.setState({ branches: [] })
});

export default branchActions;
