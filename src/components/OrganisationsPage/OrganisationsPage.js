import { h, Component } from 'preact';
import style from './organisation-page-style';
import organisationActions from '../../actions/organisationActions';
import breadcrumbActions from '../../actions/breadcrumbActions';
import { connect } from 'redux-zero/react';
import OrganisationDetails from './OrganisationDetails';
import Search from './Search';
import { combineActions } from "redux-zero/utils";

const mapToProps = ({ organisation, fetchingOrganisation: fetching }) => ({ organisation, fetching });

class OrganisationsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notFound: false
		};
		this.searchInput = null;
		this.handleOrganisationSearch = this.handleOrganisationSearch.bind(this);
		this.saveSearchRef = this.saveSearchRef.bind(this);
		this.clearState = this.clearState.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.handleOrganisationSearch();
		}
	}

	saveSearchRef(node) {
		this.searchInput = node;
	}

	componentDidMount() {
		this.props.clearBreadcrumbs();
	}
	componentWillReceiveProps(nextProps) {
		const notFound =
			(this.props.fetching && !nextProps.fetching && nextProps.organisation.id == undefined) ? // eslint-disable-line eqeqeq
				true : false;
		this.setState({ notFound });
	}

	handleOrganisationSearch() {
		if (this.searchInput.value) {
			this.setState({ notFound: false });
			this.props.resetStoreToInitalState();
			this.props.getOrganisationByUsername(this.searchInput.value);
		}
	}

	clearState(e) {
		if (e.target.value === '') {
			this.props.resetStoreToInitalState();
			return;
		}
	}

	render({ organisation, fetching }, { notFound }) {
		return (

			<div class={['uk-container uk-text-center', style.organisation].join(' ')}>
				<div>
					<h2 class={[style.headline].join(' ')}>Search Github Organisations</h2>
					<Search
						saveSearchRef={this.saveSearchRef}
						handleOrganisationSearch={this.handleOrganisationSearch}
						clearState={this.clearState}
						handleKeyPress={this.handleKeyPress} />

				</div>
				<OrganisationDetails
					organisation={organisation}
					fetching={fetching}
					notFound={notFound} />
			</div>


		);
	}
}

export default connect(mapToProps,
	combineActions(organisationActions, breadcrumbActions))(OrganisationsPage);
