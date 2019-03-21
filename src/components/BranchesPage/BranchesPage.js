import { h, Component } from 'preact';
import style from './branches-page';
import branchActions from '../../actions/branchActions';
import breadcrumbActions from '../../actions/breadcrumbActions';
import { connect } from 'redux-zero/react';
import BranchList from './BranchList';
import Pagination from '../Pagination';
import { combineActions } from "redux-zero/utils";

const mapToProps = ({ branches, fetchingBranches: fetching }) => ({ branches, fetching });

class BranchesPage extends Component {
	constructor(props) {
		super(props);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.setBreadcrumbs = this.setBreadcrumbs.bind(this);
	}

	setBreadcrumbs(value) {
		this.props.setBreadcrumbs(value);
	}

	handlePageChange(direction) {
		this.props.getRepositoryBranches({ orgName: this.props.orgName, repoName: this.props.repoName, direction });
	}

	componentDidMount() {
		const { orgName, repoName } = this.props;
		this.props.getRepositoryBranches({ orgName, repoName });

		let breadcrumbs = [{
			name: 'back'
		}, {
			name: `${orgName}`,
			link: `/${orgName}/repos`
		},
		{
			name: `${repoName}`
		},
		{
			name: `branches`
		}];
		this.setBreadcrumbs(breadcrumbs);
	}

	render({ branches, fetching }, { }) { //eslint-disable-line no-unused-vars
		const { pageInfo } = branches;

		return (
			<div class={style.branches}>
				<hr />
				<BranchList branches={branches} fetching={fetching} />
				<Pagination
					handlePageChange={this.handlePageChange}
					pageInfo={pageInfo} />
			</div>
		);
	}
}

export default connect(mapToProps,
	combineActions(branchActions, breadcrumbActions))(BranchesPage);
