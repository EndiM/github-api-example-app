import { makeOrganisationQuery } from '../queries/organisationQueries';
import { remoteFetch } from '../api';
const organisationActions = store => ({
	getOrganisationByUsername: (state, value) => {
		store.setState({ fetchingOrganisation: true });
		const body = makeOrganisationQuery({ username: value });
		remoteFetch({ body })
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(responseData => {
				const organisation = responseData.data.repositoryOwner != null ? responseData.data.repositoryOwner : {}; // eslint-disable-line eqeqeq
				store.setState({
					organisation: Object.assign({}, state.organisation, organisation),
					fetchingOrganisation: false,
					error: false
				});
			})
			.catch(() => store.setState({
				fetchingOrganisation: false,
				error: true
			}));
	},
	resetStoreToInitalState: () => store.reset()

});

export default organisationActions;
