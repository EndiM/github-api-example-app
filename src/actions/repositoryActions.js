import { sort } from '../utils';
import { remoteFetch } from '../api';
import { makeOrganisationRepositoriesQuery, makeLanguagesQuery } from '../queries/repositoryQueries';
const repositoryActions = store => ({
	getOrganisationRepositories: (state, { orgName, direction } = {}) => {

		store.setState({
			fetchingRepositories: true
		});

		let paginationSection = ``;
		const { pageInfo } = state.repositories;
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

		const insertFilter = state.filterRepositoriesBy !== "" ? `language:${state.filterRepositoriesBy}` : "";

		const body = makeOrganisationRepositoriesQuery({ paginationSection, orgName, insertFilter });

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
				const repositories = responseData.data.search.edges.map(e => ({
					...e.node,
					starCount: e.node.stargazers.totalCount,
					issueCount: e.node.issues.totalCount,
					language: e.node.primaryLanguage ? e.node.primaryLanguage.name : ""
				}));
				store.setState({
					repositories: Object.assign(
						{},
						{
							// items: repositories,
							items: [...sort(repositories, state.sortRepositoriesBy, state.sortOrder)],
							totalCount: responseData.data.search.repositoryCount,
							pageInfo: Object.assign({}, state.repositories.pageInfo, responseData.data.search.pageInfo)
						}),
					fetchingRepositories: false,
					error: false
				});
			})
			.catch(() => store.setState({
				fetchingRepositories: false,
				error: true
			}));
	},
	clearRepositoryList: () => store.setState({ repositories: [] }),
	sortRepositories: (state, { sortBy, sortOrder }) => {
		return store.setState({
			repositories:
				Object.assign({}, state.repositories, { items: [...sort(state.repositories.items, sortBy, sortOrder)] }),
			sortRepositoriesBy: sortBy,
			sortOrder
		});
	},
	updateSortOptions: (state, { value, order }) => {

		const newSortOptions = state.sortOptions.map(option => {
			if (option.value === value) {
				return Object.assign({}, option, { order });
			}
			return Object.assign({}, option, { order: '' });
		});
		store.setState({
			sortOptions: newSortOptions
		});
	},
	getAllLanguages: function getAllLanguages(state, { orgName, endCursor } = {}) {

		store.setState({ fetchingLanguages: true });

		const next = endCursor ? `,after:\"${endCursor}\"` : ''; // eslint-disable-line no-useless-escape
		const body = makeLanguagesQuery({ orgName, next });


		return remoteFetch({ body })
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(responseData => {
				if (responseData.errors != undefined) { // eslint-disable-line eqeqeq
					throw new Error();
				}

				const languages = state.languages;
				responseData.data.search.edges.forEach(e => {
					const name = e.node.primaryLanguage ? e.node.primaryLanguage.name : "notdef";
					if (name === 'notdef') {
						return;
					}
					languages[name] != undefined ? // eslint-disable-line eqeqeq
						(languages[name] = languages[name] + 1) : (languages[name] = 1);
				});
				store.setState({
					languages: Object.assign({}, state.languages, languages),
					fetchingLanguages: responseData.data.search.pageInfo.hasNextPage,
					error: false
				});

				if (responseData.data.search.pageInfo.hasNextPage) {
					getAllLanguages(store.getState(), { orgName, endCursor: responseData.data.search.pageInfo.endCursor });
				}
			})
			.catch(() => store.setState({
				fetchingLanguages: false,
				error: true
			}));

	},
	clearLanguages: () => {
		store.setState({ languages: [] });
	},
	setFilter: (state, { value }) => {
		store.setState({ filterRepositoriesBy: value });
	},
	setPerPage: (state, { value }) => {
		store.setState({ pagination: Object.assign({}, state.pagination, { perPage: value }) });
	}
});

export default repositoryActions;
