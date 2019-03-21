export const initialState = {
	organisation: {
		repositories: { totalCount: 0 }
	},
	repositories: {
		totalCount: 0,
		pageInfo: {
			startCursor: "",
			endCursor: "",
			hasNextPage: true
		},
		items: []
	},
	sortRepositoriesBy: "starCount",
	sortOrder: 'desc',
	sortOptions: [{
		value: 'starCount',
		name: 'Stars',
		order: 'desc'
	}, {
		value: 'forkCount',
		name: 'Forks',
		order: ''
	}, {
		value: 'issueCount',
		name: 'Issues',
		order: ''
	}],
	breadcrumbs: [],
	filterRepositoriesBy: "",
	branches: {
		totalCount: 0,
		pageInfo: {
			startCursor: "",
			endCursor: "",
			hasNextPage: true,
			hasPreviousPage: false
		},
		items: []
	},
	fetchingOrganisation: false,
	fetchingRepositories: false,
	fetchingBranches: false,
	fetchingLanguages: false,
	error: false,
	pagination: {
		perPage: 10
	},
	languages: {}
};
