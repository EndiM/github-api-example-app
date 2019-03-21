const breadcrumbActions = store => ({
	setBreadcrumbs: (state, value) => {
		store.setState({ breadcrumbs: [...value] });
	},
	clearBreadcrumbs: () => store.setState({ breadcrumbs: [] })

});

export default breadcrumbActions;
