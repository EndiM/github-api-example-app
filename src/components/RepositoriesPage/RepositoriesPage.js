import { h, Component } from 'preact';
import repositoryActions from '../../actions/repositoryActions';
import breadcrumbActions from '../../actions/breadcrumbActions';
import { connect } from 'redux-zero/react';
import RepositoryList from './RepositoryList';
import Sort from './Sort';
import Filter from './Filter';
import PerPage from './PerPage';
import Pagination from '../Pagination';
import style from './repositories-page-style';
import { combineActions } from "redux-zero/utils";

const mapToProps = ({ repositories, sortOptions, breadcrumbs,
	fetchingLanguages, filterRepositoriesBy,
	languages,
	sortRepositoriesBy, fetchingRepositories: fetching, sortOrder, pagination }) => ({
	repositories, sortOptions, breadcrumbs, fetchingLanguages, filterRepositoriesBy, sortRepositoriesBy,
	fetching, sortOrder, pagination, languages
});

class RepositoriesPage extends Component {
	constructor(props) {
		super(props);
		this.handleSort = this.handleSort.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.handlePerPageChange = this.handlePerPageChange.bind(this);
		this.setBreadcrumbs = this.setBreadcrumbs.bind(this);
	}

	setBreadcrumbs(value) {
		this.props.setBreadcrumbs(value);
	}

	handlePageChange(direction) {
		this.props.getOrganisationRepositories({ orgName: this.props.orgName, direction, filter: this.props.filterRepositoriesBy });
	}

	componentDidMount() {
		const { orgName, repositories } = this.props;

		if (!repositories.totalCount) {
			this.props.clearLanguages();
			this.props.getAllLanguages({ orgName });
			this.props.getOrganisationRepositories({ orgName });
		}

		let breadcrumbs = [{
			name: 'back'
		}, {
			name: `${orgName}`,
			link: `/${orgName}/repos`
		},
		{
			name: `repositories`
		}];
		this.setBreadcrumbs(breadcrumbs);
	}

	handleSort({ value, order }) {
		this.props.updateSortOptions({ value, order });
		this.props.sortRepositories({ sortBy: value, sortOrder: order });
	}

	handlePerPageChange(e) {
		this.props.setPerPage({ value: e.target.value });
		this.props.getOrganisationRepositories({ orgName: this.props.orgName });
	}

	handleFilter(event) {
		this.props.setFilter({ value: event.target.value });
		this.props.getOrganisationRepositories({ orgName: this.props.orgName });
	}

	render({ orgName, repositories, sortOptions,
		fetchingLanguages, languages, filterRepositoriesBy,
		sortRepositoriesBy, sortOrder, fetching, pagination }, { }) {
		const { pageInfo } = repositories;
		return (
			<div class={style.repositories}>
				<div class={style.toolbar}>
					<Sort by={sortRepositoriesBy}
						order={sortOrder}
						handleSort={this.handleSort}
						sortOptions={sortOptions} />

					<Filter
						languages={languages}
						by={filterRepositoriesBy}
						handleFilter={this.handleFilter}
						fetching={fetchingLanguages} />

					<PerPage
						perPage={pagination.perPage}
						fetching={fetching}
						onChange={this.handlePerPageChange} />
				</div>

				<hr />
				<RepositoryList
					repositories={repositories}
					orgName={orgName}
					fetching={fetching}
					sortBy={sortRepositoriesBy} />

				<Pagination
					handlePageChange={this.handlePageChange}
					pageInfo={pageInfo} />
			</div>
		);
	}
}

export default connect(mapToProps, combineActions(repositoryActions, breadcrumbActions))(RepositoriesPage);
